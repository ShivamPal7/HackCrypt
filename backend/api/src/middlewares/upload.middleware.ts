import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'student_verification',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    } as any, // casting to any to avoid type issues with params
});

const upload = multer({ storage: storage });

export default upload;
