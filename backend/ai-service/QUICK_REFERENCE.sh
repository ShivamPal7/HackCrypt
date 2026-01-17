#!/bin/bash
# FastAPI Server Quick Reference

echo "=========================================="
echo "Face Recognition API - Quick Reference"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}✅ SERVER IS RUNNING${NC}"
echo "   URL: http://localhost:5000"
echo "   Docs: http://localhost:5000/docs"
echo ""

echo -e "${YELLOW}📋 AVAILABLE ENDPOINTS:${NC}"
echo ""

echo "1. HEALTH CHECK"
echo "   GET /health"
echo "   → Check if API is running and models are loaded"
echo ""

echo "2. REGISTER FACE"
echo "   POST /register-face?person_name=john"
echo "   → Body: form-data with 'file' (image)"
echo "   → Returns: success, image_name, liveness_score"
echo ""

echo "3. VERIFY FACE"
echo "   POST /verify-face"
echo "   → Body: form-data with 'file' (image)"
echo "   → Returns: verified (true/false), confidence, matched_image"
echo ""

echo "4. GET REGISTERED FACES"
echo "   GET /registered-faces"
echo "   → Returns: count, list of face filenames"
echo ""

echo "5. GET CONFIG"
echo "   GET /config"
echo "   → Returns: thresholds, paths"
echo ""

echo -e "${YELLOW}🔧 CURL EXAMPLES:${NC}"
echo ""

echo "📸 Register a face:"
echo '  curl -X POST "http://localhost:5000/register-face?person_name=john" \'
echo '    -F "file=@/path/to/photo.jpg"'
echo ""

echo "✓ Verify a face:"
echo '  curl -X POST "http://localhost:5000/verify-face" \'
echo '    -F "file=@/path/to/photo.jpg"'
echo ""

echo "🏥 Health check:"
echo '  curl http://localhost:5000/health'
echo ""

echo "📋 List faces:"
echo '  curl http://localhost:5000/registered-faces'
echo ""

echo -e "${YELLOW}📊 RESPONSE EXAMPLES:${NC}"
echo ""

echo "Register Success (201):"
echo '{
  "success": true,
  "message": "Face registered successfully",
  "image_name": "john_20260116_100000.jpg",
  "embedding_saved": true,
  "liveness_score": 0.95
}'
echo ""

echo "Verify Success (200):"
echo '{
  "verified": true,
  "confidence": 0.92,
  "matched_image": "john_20260116_100000.jpg",
  "liveness_score": 0.95,
  "distance": 0.73
}'
echo ""

echo "Verify Failed (200):"
echo '{
  "verified": false,
  "confidence": 0.0,
  "matched_image": null,
  "liveness_score": 0.02,
  "distance": null,
  "reason": "Face is not live"
}'
echo ""

echo -e "${YELLOW}⚙️ CONFIGURATION:${NC}"
echo ""
echo "Edit app/.env to change:"
echo "  - DATA_FOLDER: Path to data folder"
echo "  - RESNET: Face recognition model"
echo "  - DEEPPIX: Liveness detection model"
echo "  - FACEBANK: Face embeddings CSV file"
echo ""

echo -e "${YELLOW}🐍 PYTHON EXAMPLES:${NC}"
echo ""

echo "Register Face (requests library):"
echo 'import requests
with open("photo.jpg", "rb") as f:
    files = {"file": f}
    params = {"person_name": "john"}
    r = requests.post("http://localhost:5000/register-face", files=files, params=params)
    print(r.json())'
echo ""

echo "Verify Face:"
echo 'import requests
with open("photo.jpg", "rb") as f:
    files = {"file": f}
    r = requests.post("http://localhost:5000/verify-face", files=files)
    result = r.json()
    if result["verified"]:
        print(f"✅ Verified! Matched: {result[\"matched_image\"]}")
    else:
        print(f"❌ Not verified. Confidence: {result[\"confidence\"]}")'
echo ""

echo -e "${YELLOW}📱 REACT NATIVE EXAMPLE:${NC}"
echo ""

echo 'const verifyFace = async (imageUri) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "face.jpg",
  });

  const response = await fetch("http://localhost:5000/verify-face", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.verified) {
    Alert.alert("✅ Verified!", `Matched: ${data.matched_image}`);
  } else {
    Alert.alert("❌ Not verified", `Confidence: ${data.confidence}`);
  }
};'
echo ""

echo -e "${YELLOW}📱 NODE.JS EXAMPLE:${NC}"
echo ""

echo 'const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const verifyFace = async (imagePath) => {
  const form = new FormData();
  form.append("file", fs.createReadStream(imagePath));

  const response = await axios.post("http://localhost:5000/verify-face", form, {
    headers: form.getHeaders(),
  });

  return response.data;
};

const result = await verifyFace("/path/to/photo.jpg");
console.log(result);'
echo ""

echo -e "${YELLOW}🔍 COMMON ERRORS:${NC}"
echo ""

echo "❌ 'No face detected'"
echo "   → Make sure face is clearly visible"
echo "   → Check image quality and lighting"
echo ""

echo "❌ 'Face is not live'"
echo "   → Use a real face, not a photo"
echo "   → Ensure good lighting"
echo "   → Face should be close to camera"
echo ""

echo "❌ 'Verification failed (all distances high)'"
echo "   → Person not in registered faces"
echo "   → Try registering from different angles"
echo "   → May need to lower VERIFICATION_THRESHOLD"
echo ""

echo "=========================================="
echo "Need help? Visit: http://localhost:5000/docs"
echo "=========================================="
