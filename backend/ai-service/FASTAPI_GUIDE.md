# FastAPI Server - Complete Integration Guide

## 🚀 Server Status
✅ **Running on:** http://localhost:5000
✅ **Documentation:** http://localhost:5000/docs (Interactive Swagger UI)
✅ **All models loaded and ready**

---

## 📋 Available Endpoints

### 1. **Health Check**
```
GET /health
```
**Purpose:** Check API status and model availability

**Response:**
```json
{
  "status": "healthy",
  "message": "Face Recognition API is running",
  "models_ready": true
}
```

---

### 2. **Register Face** ⭐
```
POST /register-face
```
**Purpose:** Register a new face and save to facebank

**Parameters:**
- `file` (form-data): Image file (JPG, PNG, HEIC)
- `person_name` (query): Optional name (e.g., "john_doe")

**cURL Example:**
```bash
curl -X POST "http://localhost:5000/register-face" \
  -F "file=@path/to/image.jpg" \
  -F "person_name=john_doe"
```

**Postman Setup:**
1. Method: `POST`
2. URL: `http://localhost:5000/register-face`
3. Params Tab:
   - Key: `person_name` | Value: `john_doe`
4. Body Tab → form-data:
   - Key: `file` | Type: `File` | Select image
5. Send

**Success Response (201):**
```json
{
  "success": true,
  "message": "Face registered successfully",
  "image_name": "john_doe_20260116_100000.jpg",
  "embedding_saved": true,
  "liveness_score": 0.95
}
```

**Error Response (422):**
```json
{
  "detail": "No face detected in image"
}
```

---

### 3. **Verify Face** ⭐
```
POST /verify-face
```
**Purpose:** Verify if a face matches registered faces

**Parameters:**
- `file` (form-data): Image file (JPG, PNG, HEIC)

**cURL Example:**
```bash
curl -X POST "http://localhost:5000/verify-face" \
  -F "file=@path/to/image.jpg"
```

**Postman Setup:**
1. Method: `POST`
2. URL: `http://localhost:5000/verify-face`
3. Body Tab → form-data:
   - Key: `file` | Type: `File` | Select image
4. Send

**Success Response (200) - VERIFIED:**
```json
{
  "verified": true,
  "confidence": 0.92,
  "matched_image": "john_doe_20260116_100000.jpg",
  "liveness_score": 0.95,
  "distance": 0.73
}
```

**Success Response (200) - NOT VERIFIED:**
```json
{
  "verified": false,
  "confidence": 0.45,
  "matched_image": null,
  "liveness_score": 0.88,
  "distance": 1.05,
  "reason": "Distance exceeds threshold"
}
```

**Liveness Failed:**
```json
{
  "verified": false,
  "confidence": 0.0,
  "matched_image": null,
  "liveness_score": 0.01,
  "distance": null,
  "reason": "Face is not live (liveness check failed)"
}
```

---

### 4. **Get Registered Faces**
```
GET /registered-faces
```
**Purpose:** List all registered faces

**cURL Example:**
```bash
curl -X GET "http://localhost:5000/registered-faces"
```

**Response:**
```json
{
  "count": 6,
  "faces": [
    "john_doe_20260116_100000.jpg",
    "john_doe_20260116_101530.jpg",
    "jane_smith_20260116_110000.jpg",
    "IMG_1581.jpg",
    "IMG_1582.jpg",
    "IMG_1583.jpg"
  ]
}
```

---

### 5. **Get Configuration**
```
GET /config
```
**Purpose:** Get API configuration and thresholds

**Response:**
```json
{
  "liveness_threshold": 0.03,
  "verification_threshold": 0.80,
  "data_folder": "/path/to/data",
  "images_folder": "/path/to/images"
}
```

---

## 📊 Integration Examples

### **React Native (Expo)**
```javascript
const registerFace = async (imageUri, personName) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'face.jpg',
  });
  formData.append('person_name', personName);

  const response = await fetch('http://localhost:5000/register-face', {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};

const verifyFace = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'face.jpg',
  });

  const response = await fetch('http://localhost:5000/verify-face', {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};
```

### **Node.js / Express**
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const registerFace = async (imagePath, personName) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(imagePath));
  form.append('person_name', personName);

  const response = await axios.post('http://localhost:5000/register-face', form, {
    headers: form.getHeaders(),
  });
  
  return response.data;
};

const verifyFace = async (imagePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(imagePath));

  const response = await axios.post('http://localhost:5000/verify-face', form, {
    headers: form.getHeaders(),
  });
  
  return response.data;
};
```

---

## 🔧 Server Commands

### **Start Server**
```bash
cd c:\Users\adarsh\OneDrive\Desktop\tr\face-recognition-liveness
C:/Users/adarsh/OneDrive/Desktop/tr/face-recognition-liveness/venv/Scripts/python.exe app/app_fastapi.py
```

### **Start with Auto-Reload (Development)**
```bash
uvicorn app.app_fastapi:app --host 0.0.0.0 --port 5000 --reload
```

### **Start with Custom Port**
```bash
uvicorn app.app_fastapi:app --host 0.0.0.0 --port 8000
```

---

## 📱 Postman Collection

**Download:** Import this JSON into Postman

```json
{
  "info": {
    "name": "Face Recognition API",
    "description": "Face registration and verification endpoints"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/health"
      }
    },
    {
      "name": "Register Face",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/register-face?person_name=john",
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "file",
              "type": "file",
              "src": "path/to/image.jpg"
            }
          ]
        }
      }
    },
    {
      "name": "Verify Face",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/verify-face",
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "file",
              "type": "file",
              "src": "path/to/image.jpg"
            }
          ]
        }
      }
    },
    {
      "name": "Get Registered Faces",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/registered-faces"
      }
    },
    {
      "name": "Get Config",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/config"
      }
    }
  ]
}
```

---

## ⚙️ Configuration

Edit `app/.env` to change settings:

```dotenv
DATA_FOLDER=data
RESNET=InceptionResnetV1_vggface2.onnx
DEEPPIX=OULU_Protocol_2_model_0_0.onnx
FACEBANK=my_facebank.csv
```

---

## 🎯 Key Features

✅ **CORS Enabled** - Works with React Native, Node.js, web apps  
✅ **Liveness Detection** - Prevents spoofing attacks  
✅ **Face Registration** - Save new faces automatically  
✅ **Face Verification** - Match against stored faces  
✅ **Auto API Docs** - Swagger UI at `/docs`  
✅ **Production-Ready** - Proper error handling  
✅ **Stateless** - Can scale horizontally  

---

## 📈 Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created (Face registered) |
| 400 | Bad request (Invalid image) |
| 422 | Unprocessable (No face detected) |
| 500 | Server error |

---

## 🐛 Troubleshooting

**"No face detected"**
- Ensure face is clearly visible
- Try different angles
- Check lighting

**"Face is not live"**
- Use a real face (not a photo)
- Ensure good lighting
- Face should be close to camera

**"Verification failed"**
- Distance too high (person not in database)
- Try registering more angles
- Adjust VERIFICATION_THRESHOLD in config

---

**API Version:** 2.0.0  
**Last Updated:** January 16, 2026
