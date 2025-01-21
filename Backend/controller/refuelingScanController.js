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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("multer");
var tesseract_js_1 = require("tesseract.js");
var openai_1 = require("openai");
var refuelService_js_1 = require("../services/refuelService.js");
var router = express_1.default.Router();
var refuelingService = new refuelService_js_1.RefuelingService();
// Configure OpenAI
var openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
// Set up Multer storage
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename based on the timestamp
    },
});
// Create the Multer upload instance
var upload = (0, multer_1.default)({ storage: storage });
// Route to scan a receipt and extract data
var scanReceipt = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagePath, ocrResult, extractedText, prompt_1, llmResponse, extractedData, refuelingData, savedRefueling, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('Received file:', req.file);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!req.file) {
                    // Directly handle the response without returning the Response object
                    res.status(400).json({ error: 'Receipt image is required' });
                    return [2 /*return*/]; // Exit the handler to prevent further processing
                }
                imagePath = req.file.path;
                return [4 /*yield*/, tesseract_js_1.default.recognize(imagePath, 'eng')];
            case 2:
                ocrResult = _b.sent();
                extractedText = ocrResult.data.text;
                prompt_1 = "\n      Extract the following data from the gas station receipt text:\n      1. Base price per liter (Price per liter)\n      2. Total price (Total)\n      3. Number of liters (Gallons)\n      Only provide the data in JSON format as follows:\n      {\n        \"pricePerLiter\": <value>,\n        \"totalCost\": <value>,\n        \"liters\": <value>\n      }\n      Text: ".concat(extractedText, "\n    ");
                return [4 /*yield*/, openai.chat.completions.create({
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: prompt_1 }],
                    })];
            case 3:
                llmResponse = _b.sent();
                extractedData = JSON.parse(((_a = llmResponse.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || '{}');
                if (!extractedData.pricePerLiter || !extractedData.totalCost || !extractedData.liters) {
                    // Handle failure to extract fields without returning the response
                    res.status(400).json({ error: 'Failed to extract required fields from the receipt' });
                    return [2 /*return*/]; // Exit the handler to prevent further processing
                }
                refuelingData = {
                    date: new Date().toISOString(),
                    time: new Date().toISOString(),
                    odometer: req.body.odometer,
                    kindOfFuel: req.body.kindOfFuel || 'Unknown',
                    pricePerLiter: extractedData.pricePerLiter,
                    totalCost: extractedData.totalCost,
                    liters: extractedData.liters,
                    gasStation: req.body.gasStation || 'Unknown',
                    driver: req.body.driver || 'Unknown',
                    fileAttachment: imagePath,
                    notes: req.body.notes || '',
                    license_plate: req.body.license_plate || '',
                };
                return [4 /*yield*/, refuelingService.createRefueling(refuelingData)];
            case 4:
                savedRefueling = _b.sent();
                // Send the response without returning the response object
                res.status(201).json(savedRefueling);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error('Error during receipt scan:', error_1);
                // Directly handle the response in case of error
                res.status(500).json({ error: 'Failed to process the receipt' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Test route
router.get('/test', function (req, res) {
    res.status(200).json({ message: 'Test route is working' });
});
// router.post('/scan', upload.single('receiptImage'), scanReceipt); // Use the handler function here
router.post('/scan', function (req, res) {
    console.log('Scan route was hit');
    res.status(200).json({ message: 'Scan route is working' });
});
exports.default = router;
