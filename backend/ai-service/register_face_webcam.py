"""
Simple script to capture a face from webcam and register it
"""
import cv2
import requests
from pathlib import Path

def register_face_from_webcam():
    """Capture face from webcam and send to API for registration"""
    
    # Get person name
    person_name = input("Enter person name (for labeling): ").strip()
    if not person_name:
        person_name = "user"
    
    # Initialize webcam
    cap = cv2.VideoCapture(0)
    
    print("\n🎥 Webcam opened. Instructions:")
    print("- Press SPACE to capture image")
    print("- Press Q to quit without capturing")
    print("\nPosition your face in the center and ensure good lighting!\n")
    
    captured_image = None
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            print("Failed to read frame")
            break
        
        # Flip frame horizontally for selfie view
        frame = cv2.flip(frame, 1)
        
        # Add instructions on frame
        cv2.putText(frame, "Press SPACE to capture, Q to quit", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(frame, f"Person: {person_name}", (10, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Draw center guide
        h, w = frame.shape[:2]
        cv2.circle(frame, (w//2, h//2), 100, (0, 255, 0), 2)
        
        cv2.imshow("Face Registration - Press SPACE to capture", frame)
        
        key = cv2.waitKey(1) & 0xFF
        
        if key == ord(' '):  # Space bar
            captured_image = frame
            print("✅ Image captured!")
            break
        elif key == ord('q') or key == ord('Q'):
            print("❌ Cancelled")
            break
    
    cap.release()
    cv2.destroyAllWindows()
    
    if captured_image is None:
        print("No image captured")
        return
    
    # Save image temporarily
    temp_image_path = "temp_capture.jpg"
    cv2.imwrite(temp_image_path, captured_image)
    
    # Send to API for registration
    print("\n📤 Registering face to API...")
    
    try:
        with open(temp_image_path, 'rb') as f:
            files = {'file': f}
            params = {'person_name': person_name}
            response = requests.post(
                'http://localhost:5000/register-face',
                files=files,
                params=params
            )
        
        if response.status_code == 201:
            result = response.json()
            print("\n✅ Registration Successful!")
            print(f"   Image Name: {result.get('image_name')}")
            print(f"   Liveness Score: {result.get('liveness_score'):.4f}")
            print(f"   Message: {result.get('message')}")
        else:
            print(f"\n❌ Registration Failed!")
            print(f"   Status Code: {response.status_code}")
            print(f"   Error: {response.text}")
    
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API server!")
        print("   Make sure FastAPI is running: python app/app_fastapi.py")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
    finally:
        # Clean up temp file
        Path(temp_image_path).unlink(missing_ok=True)

if __name__ == "__main__":
    register_face_from_webcam()
