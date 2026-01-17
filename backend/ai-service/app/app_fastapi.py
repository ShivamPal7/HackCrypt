"""
Face Recognition & Liveness Detection FastAPI Server
Production-ready API for face registration and verification
"""

import os
import io
import csv
from os import environ
from pathlib import Path
from typing import Optional, Dict, Any

import cv2
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, HTTPException, status, Query
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from facetools import FaceDetection, IdentityVerification, LivenessDetection

# ============================================================================
# CONFIGURATION & INITIALIZATION
# ============================================================================

root = Path(os.path.abspath(__file__)).parent.absolute()
load_dotenv((root / ".env").as_posix())

# Environment variables
data_folder = Path(environ.get("DATA_FOLDER", "data"))
if not data_folder.is_absolute():
    data_folder = root.parent / data_folder

resnet_name = environ.get("RESNET", "InceptionResnetV1_vggface2.onnx")
deeppix_name = environ.get("DEEPPIX", "OULU_Protocol_2_model_0_0.onnx")
facebank_name = environ.get("FACEBANK", "my_facebank.csv")

# Paths
images_folder = data_folder / "images"
checkpoints_folder = data_folder / "checkpoints"
resnet_checkpoint_path = checkpoints_folder / resnet_name
facebank_path = data_folder / facebank_name
deeppix_checkpoint_path = checkpoints_folder / deeppix_name

# Thresholds
LIVENESS_THRESHOLD = 0.03
VERIFICATION_THRESHOLD = 0.80

# Initialize models (will be done in lifespan)
face_detector = None
identity_checker = None
liveness_detector = None

# ============================================================================
# LIFESPAN EVENTS
# ============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    global face_detector, identity_checker, liveness_detector
    
    # Startup
    print("🚀 Initializing Face Recognition Models...")
    
    # Create directories if they don't exist
    images_folder.mkdir(parents=True, exist_ok=True)
    checkpoints_folder.mkdir(parents=True, exist_ok=True)
    
    try:
        face_detector = FaceDetection()
        print("✓ Face Detection model loaded")
        
        identity_checker = IdentityVerification(
            checkpoint_path=resnet_checkpoint_path.as_posix(),
            facebank_path=facebank_path.as_posix(),
        )
        print("✓ Identity Verification model loaded")
        
        liveness_detector = LivenessDetection(
            checkpoint_path=deeppix_checkpoint_path.as_posix()
        )
        print("✓ Liveness Detection model loaded")
        
        print("✅ All models initialized successfully\n")
        
    except Exception as e:
        print(f"❌ Error loading models: {str(e)}")
        raise
    
    yield
    
    # Shutdown
    print("\n🛑 Shutting down API...")
    print("✅ API shutdown complete")


# ============================================================================
# FASTAPI APP
# ============================================================================

app = FastAPI(
    title="Face Recognition & Liveness Detection API",
    description="Production API for face registration, verification, and liveness detection",
    version="2.0.0",
    lifespan=lifespan
)

# Enable CORS for React Native & Node.js clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production: replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def validate_image(image_data: bytes) -> Optional[np.ndarray]:
    """
    Validate and decode image data
    Supports: JPG, PNG, HEIC
    """
    try:
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return None
        
        return frame
    except Exception:
        return None


def extract_face_embedding(face_arr: np.ndarray) -> np.ndarray:
    """Extract face embedding using the ResNet model"""
    face_arr_moved = np.moveaxis(face_arr, -1, 0)
    input_arr = np.expand_dims((face_arr_moved - 127.5) / 128.0, 0)
    embeddings = identity_checker.resnet.run(
        ["output"], {"input": input_arr.astype(np.float32)}
    )[0]
    return embeddings


def save_embedding_to_csv(embedding: np.ndarray, csv_path: Path):
    """Append embedding to CSV file"""
    try:
        with open(csv_path, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(embedding.flatten().tolist())
    except Exception as e:
        raise Exception(f"Failed to save embedding: {str(e)}")


def load_all_embeddings() -> Dict[str, np.ndarray]:
    """Load all embeddings from images folder"""
    embeddings = {}
    
    # Get all image files
    image_files = (
        list(images_folder.glob("*.jpg")) +
        list(images_folder.glob("*.png")) +
        list(images_folder.glob("*.jpeg"))
    )
    
    for image_path in image_files:
        try:
            image = cv2.imread(str(image_path))
            if image is None:
                continue
            
            faces, _ = face_detector(image)
            if len(faces) == 0:
                continue
            
            embedding = extract_face_embedding(faces[0])
            embeddings[image_path.name] = embedding
            
        except Exception as e:
            print(f"Warning: Could not process {image_path.name}: {str(e)}")
            continue
    
    return embeddings


def verify_against_stored_faces(snapshot_embedding: np.ndarray) -> Dict[str, Any]:
    """Compare snapshot embedding against all stored faces - Returns only Python native types"""
    stored_embeddings = load_all_embeddings()
    
    if not stored_embeddings:
        return {
            "verified": False,
            "confidence": 0.0,
            "matched_image": None,
            "distance": None
        }
    
    best_match = None
    best_distance = float('inf')
    
    for filename, stored_embedding in stored_embeddings.items():
        diff = stored_embedding - snapshot_embedding
        distance = float(np.linalg.norm(diff))
        
        if distance < best_distance:
            best_distance = distance
            best_match = filename
    
    # Ensure all values are Python native types
    confidence = float(max(0.0, 1.0 - (best_distance / 2.0)))
    is_verified = bool(int(best_distance < VERIFICATION_THRESHOLD))
    
    return {
        "verified": is_verified,
        "confidence": confidence,
        "matched_image": best_match if is_verified else None,
        "distance": float(best_distance) if best_distance != float('inf') else None
    }


# ============================================================================
# ROOT & HEALTH ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """API root endpoint with documentation links"""
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "message": "Face Recognition & Liveness Detection API",
            "version": "2.0.0",
            "documentation": "http://localhost:5000/docs",
            "endpoints": {
                "health": "GET /health",
                "register_face": "POST /register-face",
                "verify_face": "POST /verify-face",
                "registered_faces": "GET /registered-faces",
                "config": "GET /config"
            }
        }
    )


@app.get("/health")
async def health_check():
    """
    Health check endpoint
    Returns API status and model availability
    """
    models_ready = (
        face_detector is not None and
        identity_checker is not None and
        liveness_detector is not None
    )
    
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "status": "healthy" if models_ready else "degraded",
            "message": "Face Recognition API is running",
            "models_ready": models_ready
        }
    )


# ============================================================================
# REGISTRATION ENDPOINT
# ============================================================================

@app.post("/register-face")
async def register_face(
    file: UploadFile = File(...),
    person_name: str = Query(None, description="Optional name for the person")
):
    """
    Register a new face
    
    **Args:**
    - file: Image file (JPG, PNG, HEIC)
    - person_name: Optional name for labeling (default: "face")
    
    **Returns:**
    ```json
    {
        "success": true,
        "message": "Face registered successfully",
        "image_name": "person_name_20260116_100000.jpg",
        "embedding_saved": true,
        "liveness_score": 0.95
    }
    ```
    """
    try:
        # Validate file upload
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No filename provided"
            )
        
        # Read and validate image
        image_data = await file.read()
        if not image_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No image data provided"
            )
        
        frame = validate_image(image_data)
        if frame is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid image format. Supported: JPG, PNG, HEIC"
            )
        
        # Detect face
        faces, boxes = face_detector(frame)
        if not len(faces):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="No face detected in image"
            )
        
        # Check liveness
        face_arr = faces[0]
        liveness_score = liveness_detector(face_arr)
        
        if liveness_score < LIVENESS_THRESHOLD:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Face is not live (liveness_score: {liveness_score:.4f}). Please use a real face."
            )
        
        # Generate image filename
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_name = person_name if person_name else "face"
        image_filename = f"{base_name}_{timestamp}.jpg"
        image_path = images_folder / image_filename
        
        # Save image
        cv2.imwrite(str(image_path), frame)
        
        # Extract and save embedding
        embedding = extract_face_embedding(face_arr)
        save_embedding_to_csv(embedding, facebank_path)
        
        response_data = {
            "success": True,
            "message": "Face registered successfully",
            "image_name": image_filename,
            "embedding_saved": True,
            "liveness_score": float(liveness_score)
        }
        
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content=jsonable_encoder(response_data)
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


# ============================================================================
# VERIFICATION ENDPOINT
# ============================================================================

@app.post("/verify-face")
async def verify_face(file: UploadFile = File(...)):
    """Verify if a face matches registered faces"""
    try:
        if not file.filename:
            raise HTTPException(status_code=400, detail="No filename provided")
        
        image_data = await file.read()
        if not image_data:
            raise HTTPException(status_code=400, detail="No image data provided")
        
        frame = validate_image(image_data)
        if frame is None:
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # Detect face
        faces, boxes = face_detector(frame)
        if not len(faces):
            raise HTTPException(status_code=422, detail="No face detected in image")
        
        # Check liveness
        face_arr = faces[0]
        liveness_score = float(liveness_detector(face_arr))
        
        if liveness_score < LIVENESS_THRESHOLD:
            response = {
                "verified": False,
                "confidence": 0.0,
                "matched_image": None,
                "liveness_score": liveness_score,
                "distance": None,
                "reason": "Face is not live"
            }
            return JSONResponse(content=jsonable_encoder(response))
        
        # Extract embedding and verify
        embedding = extract_face_embedding(face_arr)
        verification_result = verify_against_stored_faces(embedding)
        
        response = {
            "verified": verification_result["verified"],
            "confidence": verification_result["confidence"],
            "matched_image": verification_result["matched_image"],
            "liveness_score": liveness_score,
            "distance": verification_result["distance"]
        }
        return JSONResponse(content=jsonable_encoder(response))
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# UTILITY ENDPOINTS
# ============================================================================

@app.get("/registered-faces")
async def get_registered_faces():
    """
    Get list of all registered faces
    
    **Returns:**
    ```json
    {
        "count": 6,
        "faces": ["face1.jpg", "face2.jpg", ...]
    }
    ```
    """
    try:
        image_files = (
            list(images_folder.glob("*.jpg")) +
            list(images_folder.glob("*.png")) +
            list(images_folder.glob("*.jpeg"))
        )
        
        face_names = sorted([f.name for f in image_files])
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "count": len(face_names),
                "faces": face_names
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve faces: {str(e)}"
        )


@app.get("/config")
async def get_config():
    """
    Get API configuration
    
    **Returns:**
    ```json
    {
        "liveness_threshold": 0.03,
        "verification_threshold": 0.80,
        "data_folder": "/path/to/data",
        "images_folder": "/path/to/images"
    }
    ```
    """
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "liveness_threshold": LIVENESS_THRESHOLD,
            "verification_threshold": VERIFICATION_THRESHOLD,
            "data_folder": str(data_folder),
            "images_folder": str(images_folder)
        }
    )


# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5000,
        reload=False,
        log_level="info"
    )
