from PIL import Image
import pillow_heif
import os
from pathlib import Path

# Register HEIF/HEIC opener
pillow_heif.register_heif_opener()

# Directory containing HEIC files
input_dir = "./data/images"
output_dir = "./data/images"

# Convert all HEIC files to JPG
for heic_file in Path(input_dir).glob("*.HEIC"):
    try:
        # Open HEIC image
        image = Image.open(heic_file)
        
        # Convert to RGB if necessary
        if image.mode in ('RGBA', 'LA', 'P'):
            image = image.convert('RGB')
        
        # Create output filename
        output_path = Path(output_dir) / heic_file.stem
        output_path = output_path.with_suffix('.jpg')
        
        # Save as JPG
        image.save(output_path, 'JPEG', quality=95)
        print(f"✓ Converted: {heic_file.name} → {output_path.name}")
    except Exception as e:
        print(f"✗ Error converting {heic_file.name}: {e}")

print("\nConversion complete!")
