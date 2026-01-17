# ⚡ QUICK START - FastAPI Face Recognition

## 🟢 Server Status: RUNNING ✅

```
✅ FastAPI Server:     http://localhost:5000
✅ Interactive Docs:   http://localhost:5000/docs
✅ All Models:         Loaded & Ready
✅ Status:             PRODUCTION READY
```

---

## 🎯 5-Minute Quick Start

### 1. **Check API Health**
```bash
curl http://localhost:5000/health
```

### 2. **Register Your Face**
```bash
# Replace "myname" with your name, "photo.jpg" with your image
curl -X POST "http://localhost:5000/register-face?person_name=myname" \
  -F "file=@photo.jpg"
```

Response:
```json
{
  "success": true,
  "image_name": "myname_20260116_100000.jpg",
  "liveness_score": 0.95
}
```

### 3. **Verify Your Face**
```bash
# Use same image or different angle
curl -X POST "http://localhost:5000/verify-face" \
  -F "file=@photo.jpg"
```

Response:
```json
{
  "verified": true,
  "confidence": 0.92,
  "matched_image": "myname_20260116_100000.jpg",
  "liveness_score": 0.95
}
```

### 4. **View Registered Faces**
```bash
curl http://localhost:5000/registered-faces
```

### 5. **View API Config**
```bash
curl http://localhost:5000/config
```

---

## 🌐 Interactive Testing

### Option 1: Swagger UI (Easiest)
1. Open browser: **http://localhost:5000/docs**
2. Click on any endpoint
3. Click "Try it out"
4. Upload file and click "Execute"

### Option 2: Postman
1. Import: `Face_Recognition_API.postman_collection.json`
2. Select endpoint
3. Attach file
4. Send

### Option 3: curl (Terminal)
See examples above

---

## 📱 Integration Code

### React Native (Expo)
```javascript
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
  
  const data = await response.json();
  return data.verified;
};
```

### Node.js
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const verifyFace = async (imagePath) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(imagePath));

  const response = await axios.post('http://localhost:5000/verify-face', form, {
    headers: form.getHeaders(),
  });
  
  return response.data.verified;
};
```

### Python
```python
import requests

def verify_face(image_path):
    with open(image_path, 'rb') as f:
        files = {'file': f}
        response = requests.post('http://localhost:5000/verify-face', files=files)
    return response.json()['verified']
```

---

## 🔧 Common Commands

### Restart Server
```bash
# Press Ctrl+C to stop
# Then run:
C:/Users/adarsh/OneDrive/Desktop/tr/face-recognition-liveness/venv/Scripts/python.exe app/app_fastapi.py
```

### Run with Debug Output
```bash
# Stop current server first (Ctrl+C)
# Run with reload:
uvicorn app.app_fastapi:app --host 0.0.0.0 --port 5000 --reload --log-level debug
```

### Change Port
```bash
# Run on different port (e.g., 8000):
uvicorn app.app_fastapi:app --host 0.0.0.0 --port 8000
```

---

## 📊 API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check API status |
| `/register-face` | POST | Register new face |
| `/verify-face` | POST | Verify a face |
| `/registered-faces` | GET | List all faces |
| `/config` | GET | Get thresholds |
| `/docs` | GET | API documentation |

---

## ⚡ Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Face registered |
| 400 | Bad request |
| 422 | No face detected |
| 500 | Server error |

---

## 🎯 Expected Behavior

### Register Works When ✅
- Real face in image
- Face is visible
- Good lighting
- JPG/PNG/HEIC format

### Verify Works When ✅
- Face matches registered image
- Real person (not photo)
- Distance < 0.80
- Liveness > 0.03

### Verify Fails When ❌
- Person not registered
- Using a photo (not live)
- Poor lighting
- Distance > 0.80

---

## 🧪 Quick Test Script

### Python
```python
import requests

BASE = "http://localhost:5000"

# 1. Health
print("1. Health:", requests.get(f"{BASE}/health").status_code)

# 2. Register
with open("test.jpg", "rb") as f:
    r = requests.post(f"{BASE}/register-face?person_name=test", files={"file": f})
    print("2. Register:", r.status_code, r.json()['success'])

# 3. List
print("3. Faces:", requests.get(f"{BASE}/registered-faces").json()['count'])

# 4. Verify
with open("test.jpg", "rb") as f:
    r = requests.post(f"{BASE}/verify-face", files={"file": f})
    print("4. Verify:", r.json()['verified'])
```

### Bash
```bash
BASE="http://localhost:5000"

echo "1. Health:"
curl $BASE/health

echo "2. Register:"
curl -X POST "$BASE/register-face?person_name=test" -F "file=@test.jpg"

echo "3. Faces:"
curl $BASE/registered-faces

echo "4. Verify:"
curl -X POST "$BASE/verify-face" -F "file=@test.jpg"
```

---

## 📂 Project Structure

```
├── app/
│   ├── app_fastapi.py      ← Main API server ⭐
│   ├── .env                ← Configuration
│   └── client.py           ← REST client
│
├── data/
│   ├── images/             ← Registered faces
│   ├── my_facebank.csv     ← Embeddings
│   └── checkpoints/        ← ML models
│
├── facetools/              ← Core logic (unchanged)
│
├── FASTAPI_GUIDE.md        ← Full documentation
├── SETUP_COMPLETE.md       ← Setup summary
├── TESTING_GUIDE.md        ← Testing instructions
├── QUICK_REFERENCE.sh      ← curl examples
└── Face_Recognition_API.postman_collection.json
```

---

## 🚀 You're All Set!

### ✅ What You Have
- Production-ready FastAPI server
- Face registration system
- Face verification system
- Liveness detection
- Auto API documentation
- Ready for React Native & Node.js

### ✅ Next Steps
1. Test with `http://localhost:5000/docs`
2. Register some faces
3. Verify them
4. Integrate into your app
5. Deploy!

---

## 💡 Tips

- **Test with different angles** for better registration
- **Use good lighting** for reliable liveness detection
- **Register multiple angles** of same person for better matching
- **Adjust VERIFICATION_THRESHOLD** if needed (currently 0.80)
- **Monitor distances** in responses to tune accuracy

---

## 🆘 Troubleshooting

**Server not responding?**
```bash
# Check if running:
curl http://localhost:5000/health

# If not, restart:
python app/app_fastapi.py
```

**"No face detected"?**
- Use clearer image
- Ensure face is visible
- Try different angle

**"Face not live"?**
- Use real face (not photo)
- Improve lighting
- Get closer to camera

**"Verification always fails"?**
- Register the face first!
- Try multiple angles
- Check distance in response

---

**You're ready! Start testing now! 🎉**

```bash
curl http://localhost:5000/health
```

Or visit: **http://localhost:5000/docs**
