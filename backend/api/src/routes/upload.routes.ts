import { Router } from 'express';
import upload from '../middlewares/upload.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { sendResponse } from '../utils/response';

const router = Router();

router.use(authenticate);

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return sendResponse(res, 400, 'No file uploaded');
    }
    // Cloudinary storage adds 'path' to the file object which is the secure URL
    sendResponse(res, 200, 'Image uploaded successfully', { url: (req.file as any).path });
});

export default router;
