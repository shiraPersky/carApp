import express, { Request, Response, RequestHandler } from 'express';
import multer from 'multer';
import { processReceipt } from '../services/refuelingScanService';
import fs from 'fs';

const router = express.Router();

// Multer setup
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            const error: Error = new Error('Only image files are allowed!');
            error.name = 'LIMIT_FILE_TYPES';
            cb(error);
            return;
        }
        cb(null, true);
    },
});

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const scanReceipt: RequestHandler = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Receipt image is required' });
            return;
        }

        const imagePath = req.file.path;

        // Call the service to process the receipt
        const result = await processReceipt(
            imagePath,
            parseInt(req.body.odometer) || 0,
            req.body.kindOfFuel || 'Regular',
            req.body.gasStation || 'Unknown',
            req.body.driver || 'Unknown',
            req.body.notes || '',
            req.body.license_plate || ''
        );

        res.status(201).json({
            message: 'Receipt processed successfully',
            extractedData: result,
        });
    } catch (error) {
        console.error('Error during receipt scan:', error);
        res.status(500).json({
            error: 'Failed to process the receipt',
            details: error.message,
        });
    }
};

router.post('/scan', (req, res, next) => {
    upload.single('receipt')(req, res, (err) => {
        if (err) {
            if (err.name === 'LIMIT_FILE_TYPES') {
                return res.status(400).json({ error: 'Only image files are allowed!' });
            }
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'File upload error' });
        }
        scanReceipt(req, res, next);
    });
});

export default router;
