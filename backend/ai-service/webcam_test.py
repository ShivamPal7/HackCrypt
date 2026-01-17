import os
from pathlib import Path
from glob import glob

import cv2
import numpy as np

from facetools import FaceDetection, IdentityVerification, LivenessDetection
from facetools.utils import visualize_results

root = Path(os.path.abspath(__file__)).parent.absolute()
data_folder = root / "data"

resNet_checkpoint_path = data_folder / "checkpoints" / "InceptionResnetV1_vggface2.onnx"
facebank_path = data_folder / "my_facebank.csv"

deepPix_checkpoint_path = data_folder / "checkpoints" / "OULU_Protocol_2_model_0_0.onnx"

faceDetector = FaceDetection(max_num_faces=1)
identityChecker = IdentityVerification(
    checkpoint_path=resNet_checkpoint_path.as_posix(),
    facebank_path=facebank_path.as_posix(),
)
livenessDetector = LivenessDetection(checkpoint_path=deepPix_checkpoint_path.as_posix())

# LIVENESS THRESHOLD - reuse existing threshold constant
LIVENESS_THRESHOLD = 0.03
# VERIFICATION THRESHOLD - distance-based (lower = better match)
# Adjusted to find matches in the 0.73-0.78 range
VERIFICATION_THRESHOLD = 0.80

# Load image embeddings from images/ folder
def load_image_embeddings():
    """Load face embeddings from all images in images/ folder"""
    image_embeddings = {}
    image_folder = data_folder / "images"
    
    # Find all image files
    image_files = (
        glob(str(image_folder / "*.jpg")) +
        glob(str(image_folder / "*.png")) +
        glob(str(image_folder / "*.jpeg"))
    )
    
    for image_path in image_files:
        image = cv2.imread(image_path)
        if image is None:
            continue
        
        faces, _ = faceDetector(image)
        if len(faces) == 0:
            continue
        
        # Get embedding for first detected face
        face_arr = faces[0]
        face_arr_moved = np.moveaxis(face_arr, -1, 0)
        input_arr = np.expand_dims((face_arr_moved - 127.5) / 128.0, 0)
        embeddings = identityChecker.resnet.run(
            ["output"], {"input": input_arr.astype(np.float32)}
        )[0]
        
        filename = Path(image_path).name
        image_embeddings[filename] = embeddings
    
    return image_embeddings

# Load embeddings once at startup
image_embeddings = load_image_embeddings()
print(f"Loaded embeddings from {len(image_embeddings)} images")

# Verification state tracking
snapshot_captured = False
snapshot_face = None
snapshot_box = None
verification_result = None
matched_filename = None
liveness_result = None

cap = cv2.VideoCapture(0)
frame_count = 0
print("\n" + "="*60)
print("FACE VERIFICATION SYSTEM - RUNNING")
print("="*60)
print("Show your face to the camera...")
print("Press 'r' to reset, 'q' to quit")
print("="*60 + "\n")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    canvas = frame.copy()
    faces, boxes = faceDetector(frame)
    frame_count += 1
    
    for face_arr, box in zip(faces, boxes):
        liveness_score = livenessDetector(face_arr)
        
        # Print real-time liveness score every 30 frames
        if frame_count % 30 == 0:
            print(f"[Frame {frame_count}] Liveness Score: {liveness_score:.4f} (Threshold: {LIVENESS_THRESHOLD})")
        
        # Check if liveness passed and snapshot not yet captured
        if liveness_score > LIVENESS_THRESHOLD and not snapshot_captured:
            print("\n>>> LIVENESS DETECTED! Capturing snapshot...")
            snapshot_captured = True
            snapshot_face = face_arr
            snapshot_box = box
            liveness_result = "LIVE"
            
            # Get embedding for snapshot
            print(">>> Extracting face embedding...")
            face_arr_moved = np.moveaxis(snapshot_face, -1, 0)
            input_arr = np.expand_dims((face_arr_moved - 127.5) / 128.0, 0)
            snapshot_embedding = identityChecker.resnet.run(
                ["output"], {"input": input_arr.astype(np.float32)}
            )[0]
            
            # Compare snapshot with all loaded image embeddings
            verification_result = "NOT VERIFIED"
            matched_filename = None
            print(f">>> Comparing against {len(image_embeddings)} reference images...")
            
            for filename, img_embedding in image_embeddings.items():
                # Calculate distance using existing IdentityVerification logic
                # Lower norm = better match (matching face distance)
                diff = img_embedding - snapshot_embedding
                norm = np.linalg.norm(diff)
                
                print(f"    {filename}: Distance = {norm:.4f} (Threshold: {VERIFICATION_THRESHOLD})")
                
                if norm < VERIFICATION_THRESHOLD:
                    verification_result = "VERIFIED"
                    matched_filename = filename
                    print(f"\n✓✓✓ MATCH FOUND! ✓✓✓")
                    break
            
            if verification_result == "NOT VERIFIED":
                print(f"\n✗✗✗ NO MATCH FOUND ✗✗✗")
            
            print(f"\n>>> RESULTS:")
            print(f"    Liveness: {liveness_result}")
            print(f"    Verification: {verification_result}")
            if matched_filename:
                print(f"    Matched Image: {matched_filename}")
            print("="*60 + "\n")
        
        # Draw results on frame
        if snapshot_captured:
            # Draw bounding box
            cv2.rectangle(
                canvas,
                (snapshot_box[0][0], snapshot_box[0][1]),
                (snapshot_box[1][0], snapshot_box[1][1]),
                (0, 255, 0),
                2,
                cv2.LINE_AA,
            )
            
            # Draw liveness result
            live_color = (0, 255, 0) if liveness_result == "LIVE" else (0, 0, 255)
            cv2.putText(
                canvas,
                f"Liveness: {liveness_result}",
                (snapshot_box[0][0], snapshot_box[0][1] - 45),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                live_color,
                2,
            )
            
            # Draw verification result
            verify_color = (0, 255, 0) if verification_result == "VERIFIED" else (0, 0, 255)
            cv2.putText(
                canvas,
                f"Verification: {verification_result}",
                (snapshot_box[0][0], snapshot_box[0][1] - 25),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                verify_color,
                2,
            )
            
            # Draw matched filename if verified
            if matched_filename:
                cv2.putText(
                    canvas,
                    f"Match: {matched_filename}",
                    (snapshot_box[0][0], snapshot_box[0][1] - 5),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (0, 255, 0),
                    2,
                )
        else:
            # While waiting for snapshot, show current liveness score only
            canvas = visualize_results(canvas, box, liveness_score, 0)
    
    cv2.imshow("face", canvas)
    k = cv2.waitKey(1)
    if k == ord("q"):
        print("\n\nProgram terminated by user (q pressed)")
        break
    elif k == ord("r"):
        # Reset verification on 'r' key press
        print("\n>>> RESET: Ready for new verification attempt\n")
        snapshot_captured = False
        snapshot_face = None
        snapshot_box = None
        verification_result = None
        matched_filename = None
        liveness_result = None

cv2.destroyAllWindows()
cap.release()
