"""
Test verify-face endpoint to see actual error
"""
import requests
from pathlib import Path

# Use one of the registered images
image_path = Path("data/images/adarsh_20260116_120248.jpg")

if not image_path.exists():
    print(f"❌ Image not found: {image_path}")
    print("Available images:")
    for img in Path("data/images").glob("*"):
        print(f"  - {img.name}")
    exit(1)

print(f"📤 Testing /verify-face with: {image_path.name}")
print("=" * 60)

try:
    with open(image_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(
            'http://localhost:5000/verify-face',
            files=files,
            timeout=30
        )
    
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {dict(response.headers)}")
    print(f"\nResponse:")
    print(response.text)
    
    if response.status_code == 200:
        try:
            result = response.json()
            print("\n✅ JSON parsed successfully!")
            print(f"Verified: {result.get('verified')} (type: {type(result.get('verified'))})")
            print(f"Confidence: {result.get('confidence')} (type: {type(result.get('confidence'))})")
            print(f"Liveness Score: {result.get('liveness_score')} (type: {type(result.get('liveness_score'))})")
        except Exception as e:
            print(f"\n❌ JSON parsing error: {e}")
    else:
        print(f"\n❌ Error response: {response.text}")

except requests.exceptions.ConnectionError:
    print("❌ Cannot connect to API!")
    print("   Make sure server is running: python app/app_fastapi.py")
except Exception as e:
    print(f"❌ Error: {type(e).__name__}: {e}")
