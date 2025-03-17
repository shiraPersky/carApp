"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const refuelingScanService_1 = require("../services/refuelingScanService");
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Multer setup
const uploadDir = 'uploads';
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            const error = new Error('Only image files are allowed!');
            error.name = 'LIMIT_FILE_TYPES';
            cb(error);
            return;
        }
        cb(null, true);
    },
});
const scanReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Receipt image is required' });
            return;
        }
        const imagePath = req.file.path;
        // Call the service to process the receipt
        const result = yield (0, refuelingScanService_1.processReceipt)(imagePath, parseInt(req.body.odometer) || 0, req.body.kindOfFuel || 'Regular', req.body.gasStation || 'Unknown', req.body.driver || 'Unknown', req.body.notes || '', req.body.license_plate || '');
        res.status(201).json({
            message: 'Receipt processed successfully',
            extractedData: result,
        });
    }
    catch (error) {
        console.error('Error during receipt scan:', error);
        res.status(500).json({
            error: 'Failed to process the receipt',
            details: error.message,
        });
    }
});
router.post('/scan', (req, res, next) => {
    upload.single('receipt')(req, res, (err) => {
        if (err) {
            if (err.name === 'LIMIT_FILE_TYPES') {
                return res.status(400).json({ error: 'Only image files are allowed!' });
            }
            if (err instanceof multer_1.default.MulterError) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'File upload error' });
        }
        scanReceipt(req, res, next);
    });
});
exports.default = router;
