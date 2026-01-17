# FastAPI Testing Guide

## 🧪 Testing the Face Recognition API

### Prerequisites
- ✅ FastAPI server running on http://localhost:5000
- ✅ Some test images available (JPG, PNG, or HEIC)
- ✅ curl or Postman installed

---

## 1️⃣ Health Check

### cURL
```bash
curl http://localhost:5000/health
```

### Expected Response
```json
{
  "status": "healthy",
  "message": "Face Recognition API is running",
  "models_ready": true
}
```

---

## 2️⃣ Register Your First Face

### Test Case 1: Register with Name
```bash
curl -X POST "http://localhost:5000/register-face?person_name=test_user" \
  -F "file=@test_image.jpg"
```

### Expected Response (201)
```json
{
  "success": true,
  "message": "Face registered successfully",
  "image_name": "test_user_20260116_100000.jpg",
  "embedding_saved": true,
  "liveness_score": 0.85
}
```

### ⚠️ If You Get Errors:

**Error: "No face detected"**
- Use a clear face image
- Try different angles
- Check image quality

**Error: "Face is not live"**
- Use a photo of a real person
- Try with better lighting
- Liveness score too low (< 0.03)

---

## 3️⃣ List Registered Faces

### cURL
```bash
curl http://localhost:5000/registered-faces
```

### Expected Response
```json
{
  "count": 1,
  "faces": [
    "test_user_20260116_100000.jpg"
  ]
}
```

---

## 4️⃣ Verify a Face

### Test Case 1: Same Person (Should Verify)
```bash
# Use the SAME image you registered
curl -X POST "http://localhost:5000/verify-face" \
  -F "file=@test_image.jpg"
```

### Expected Response - VERIFIED ✅
```json
{
  "verified": true,
  "confidence": 0.95,
  "matched_image": "test_user_20260116_100000.jpg",
  "liveness_score": 0.88,
  "distance": 0.42
}
```

### Test Case 2: Different Person (Should Not Verify)
```bash
# Use a DIFFERENT person's image
curl -X POST "http://localhost:5000/verify-face" \
  -F "file=@different_person.jpg"
```

### Expected Response - NOT VERIFIED ❌
```json
{
  "verified": false,
  "confidence": 0.12,
  "matched_image": null,
  "liveness_score": 0.92,
  "distance": 1.85
}
```

### Test Case 3: Fake/Photo (Should Fail Liveness)
```bash
# Use a PHOTO of a face (not real)
curl -X POST "http://localhost:5000/verify-face" \
  -F "file=@photo_of_face.jpg"
```

### Expected Response - LIVENESS FAILED ❌
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

## 5️⃣ API Configuration

### Get Current Settings
```bash
curl http://localhost:5000/config
```

### Response
```json
{
  "liveness_threshold": 0.03,
  "verification_threshold": 0.80,
  "data_folder": "C:\\...\\data",
  "images_folder": "C:\\...\\data\\images"
}
```

---

## 📊 Test Plan

| # | Test | Input | Expected | Status |
|---|------|-------|----------|--------|
| 1 | Health Check | GET /health | 200, healthy | ⏳ |
| 2 | Register Face | POST /register-face | 201, success | ⏳ |
| 3 | List Faces | GET /registered-faces | 200, count>0 | ⏳ |
| 4 | Verify Same | POST /verify-face (same image) | 200, verified=true | ⏳ |
| 5 | Verify Different | POST /verify-face (diff person) | 200, verified=false | ⏳ |
| 6 | Verify Photo | POST /verify-face (photo) | 200, liveness fail | ⏳ |
| 7 | Get Config | GET /config | 200, thresholds | ⏳ |
| 8 | Invalid Image | POST /verify-face (corrupt) | 400, bad request | ⏳ |
| 9 | No File | POST /verify-face (no file) | 400, no data | ⏳ |

---

## 🧑‍💻 Python Testing Script

Save as `test_api.py`:

```python
import requests
import json
from pathlib import Path

BASE_URL = "http://localhost:5000"

def print_response(response):
    """Pretty print API response"""
    print(f"Status: {response.status_code}")
    try:
        print(json.dumps(response.json(), indent=2))
    except:
        print(response.text)
    print("-" * 50)

def test_health():
    """Test health endpoint"""
    print("✓ Testing Health Check...")
    r = requests.get(f"{BASE_URL}/health")
    print_response(r)

def test_register(image_path, person_name="test_user"):
    """Register a face"""
    print(f"✓ Registering face: {person_name}")
    with open(image_path, 'rb') as f:
        files = {"file": f}
        params = {"person_name": person_name}
        r = requests.post(f"{BASE_URL}/register-face", files=files, params=params)
    print_response(r)

def test_verify(image_path):
    """Verify a face"""
    print(f"✓ Verifying face: {image_path}")
    with open(image_path, 'rb') as f:
        files = {"file": f}
        r = requests.post(f"{BASE_URL}/verify-face", files=files)
    print_response(r)

def test_list_faces():
    """List registered faces"""
    print("✓ Listing registered faces...")
    r = requests.get(f"{BASE_URL}/registered-faces")
    print_response(r)

def test_config():
    """Get API config"""
    print("✓ Getting config...")
    r = requests.get(f"{BASE_URL}/config")
    print_response(r)

if __name__ == "__main__":
    # Replace with your test images
    test_image_1 = "test_image_1.jpg"
    test_image_2 = "test_image_2.jpg"
    
    print("\n" + "="*50)
    print("FACE RECOGNITION API - TEST SUITE")
    print("="*50 + "\n")
    
    # Run tests
    test_health()
    
    if Path(test_image_1).exists():
        test_register(test_image_1, "john_doe")
        test_list_faces()
        test_verify(test_image_1)
        
        if Path(test_image_2).exists():
            test_verify(test_image_2)
    else:
        print(f"❌ Test image not found: {test_image_1}")
        print("   Place your test images in the current directory")
    
    test_config()
    
    print("="*50)
    print("TESTS COMPLETE")
    print("="*50)
```

### Run Tests
```bash
python test_api.py
```

---

## 🧑‍💻 Node.js Testing Script

Save as `test_api.js`:

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000';

function printResponse(label, response) {
  console.log(`\n✓ ${label}`);
  console.log(`Status: ${response.status}`);
  console.log(JSON.stringify(response.data, null, 2));
  console.log('-'.repeat(50));
}

async function testHealth() {
  console.log('✓ Testing Health Check...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    printResponse('Health Check', response);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function testRegister(imagePath, personName) {
  console.log(`✓ Registering face: ${personName}`);
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));

    const response = await axios.post(
      `${BASE_URL}/register-face?person_name=${personName}`,
      form,
      { headers: form.getHeaders() }
    );
    printResponse('Register Face', response);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testVerify(imagePath) {
  console.log(`✓ Verifying face: ${imagePath}`);
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));

    const response = await axios.post(
      `${BASE_URL}/verify-face`,
      form,
      { headers: form.getHeaders() }
    );
    printResponse('Verify Face', response);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testListFaces() {
  console.log('✓ Listing registered faces...');
  try {
    const response = await axios.get(`${BASE_URL}/registered-faces`);
    printResponse('List Faces', response);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function testConfig() {
  console.log('✓ Getting config...');
  try {
    const response = await axios.get(`${BASE_URL}/config`);
    printResponse('Get Config', response);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('\n' + '='.repeat(50));
  console.log('FACE RECOGNITION API - TEST SUITE');
  console.log('='.repeat(50));

  const testImage1 = 'test_image_1.jpg';
  const testImage2 = 'test_image_2.jpg';

  await testHealth();

  if (fs.existsSync(testImage1)) {
    await testRegister(testImage1, 'john_doe');
    await testListFaces();
    await testVerify(testImage1);

    if (fs.existsSync(testImage2)) {
      await testVerify(testImage2);
    }
  } else {
    console.log(`❌ Test image not found: ${testImage1}`);
  }

  await testConfig();

  console.log('='.repeat(50));
  console.log('TESTS COMPLETE');
  console.log('='.repeat(50));
}

// Run tests
runTests().catch(console.error);
```

### Run Tests
```bash
node test_api.js
```

---

## 📈 Performance Testing

### Load Test with Apache Bench
```bash
# Single request
ab -n 1 -c 1 http://localhost:5000/health

# 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:5000/health
```

### Response Time Analysis
```bash
time curl http://localhost:5000/health
```

---

## ✅ Test Checklist

- [ ] Server is running and accessible
- [ ] Health check returns 200
- [ ] Can register a face successfully
- [ ] Registered face appears in list
- [ ] Same person verifies successfully
- [ ] Different person doesn't verify
- [ ] Photo fails liveness check
- [ ] API returns proper error codes
- [ ] Swagger UI accessible at /docs

---

## 🎯 Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| Register face works | ⏳ |
| Verify same person passes | ⏳ |
| Verify different person fails | ⏳ |
| Liveness check works | ⏳ |
| API docs accessible | ⏳ |
| Error handling correct | ⏳ |
| Performance > 5 req/s | ⏳ |

---

**Ready to test!** 🚀
