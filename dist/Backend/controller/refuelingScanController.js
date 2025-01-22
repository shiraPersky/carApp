"use strict";
// import express, { Request, Response, RequestHandler } from 'express';
// import multer from 'multer';
// import Tesseract from 'tesseract.js';
// import OpenAI from 'openai';
// import { PrismaClient } from '@prisma/client';
// import { RefuelingDto } from '../dto/refuelDto.js';
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
// const prisma = new PrismaClient();
// const router = express.Router();
// // Configure OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage });
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }
// // const scanReceipt: RequestHandler = async (req: MulterRequest, res: Response): Promise<void> => {
// //   try {
// //     if (!req.file) {
// //       res.status(400).json({ error: 'Receipt image is required' });
// //       return;
// //     }
// //     const imagePath = req.file.path;
// //     // Step 1: Perform OCR
// //     console.log('Starting OCR processing...');
// //     const ocrResult = await Tesseract.recognize(imagePath, 'eng');
// //     const extractedText = ocrResult.data.text;
// //     console.log('Extracted text:', extractedText);
// //     // Step 2: Use OpenAI to extract specific data
// //     console.log('Processing with OpenAI...');
// //     const prompt = `
// //       Extract only these three values from the gas station receipt text:
// //       1. Price per liter
// //       2. Total price
// //       3. Number of liters
// //       Provide only these three numbers in JSON format as follows:
// //       {
// //         "pricePerLiter": <number>,
// //         "totalCost": <number>,
// //         "liters": <number>
// //       }
// //       Text from receipt: ${extractedText}
// //     `;
// //     const llmResponse = await openai.chat.completions.create({
// //       model: 'gpt-3.5-turbo',
// //       messages: [{ role: 'user', content: prompt }],
// //     });
// //     const extractedData = JSON.parse(
// //       llmResponse.choices[0].message?.content || '{}'
// //     );
// //     console.log('Extracted data:', extractedData);
// //     if (!extractedData.pricePerLiter || !extractedData.totalCost || !extractedData.liters) {
// //       res.status(400).json({ error: 'Failed to extract required fields from the receipt' });
// //       return;
// //     }
// //     // Step 3: Save to database
// //     console.log('Saving to database...');
// //     const refuelingData = await prisma.refueling.create({
// //       data: {
// //         date: new Date(),
// //         time: new Date().toLocaleTimeString(),
// //         odometer: parseInt(req.body.odometer) || 0,
// //         kindOfFuel: req.body.kindOfFuel || 'Unknown',
// //         pricePerLiter: parseFloat(extractedData.pricePerLiter),
// //         totalCost: parseFloat(extractedData.totalCost),
// //         liters: parseFloat(extractedData.liters),
// //         gasStation: req.body.gasStation || 'Unknown',
// //         driver: req.body.driver || 'Unknown',
// //         fileAttachment: imagePath,
// //         notes: req.body.notes || '',
// //         license_plate: req.body.license_plate || '',
// //       }
// //     });
// //     // Step 4: Return the saved data
// //     res.status(201).json({
// //       message: 'Receipt processed successfully',
// //       extractedData: {
// //         pricePerLiter: refuelingData.pricePerLiter,
// //         totalCost: refuelingData.totalCost,
// //         liters: refuelingData.liters
// //       },
// //       savedRecord: refuelingData
// //     });
// //   } catch (error) {
// //     console.error('Error during receipt scan:', error);
// //     res.status(500).json({ error: 'Failed to process the receipt', details: error.message });
// //   }
// // };
// const scanReceipt: RequestHandler = async (req: MulterRequest, res: Response): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ error: 'Receipt image is required' });
//       return;
//     }
//     const imagePath = req.file.path;
//     // Step 1: Perform OCR
//     console.log('Starting OCR processing...');
//     const ocrResult = await Tesseract.recognize(imagePath, 'eng');
//     const extractedText = ocrResult.data.text;
//     console.log('Extracted text:', extractedText);
//     let extractedData;
//     try {
//       // Try OpenAI first
//       console.log('Attempting to process with OpenAI...');
//       const prompt = `
//         From this gas station receipt, find:
//         1. The price per unit (whether it's per gallon or per liter)
//         2. The quantity of fuel (in gallons or liters)
//         3. The total cost
//         Important: Look for any numbers that might represent these values, even if they're labeled differently.
//         Return ONLY a JSON object like this:
//         {
//           "unitPrice": <number>,
//           "quantity": <number>,
//           "isGallons": <boolean>,  // true if the quantity is in gallons, false if in liters
//           "totalCost": <number>
//         }
//         Receipt text:
//         ${extractedText}
//       `;
//       const llmResponse = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//       });
//       extractedData = JSON.parse(llmResponse.choices[0].message?.content || '{}');
//     } catch (aiError) {
//       console.log('OpenAI processing failed:', aiError.message);
//       // If OpenAI fails, throw error to be caught by outer catch
//       throw new Error('Failed to process receipt with AI. Please try again later or contact support.');
//     }
//     if (!extractedData.unitPrice || !extractedData.quantity || !extractedData.totalCost) {
//       res.status(400).json({ 
//         error: 'Could not extract all required values from receipt',
//         extractedText: extractedText
//       });
//       return;
//     }
//     // Convert to liters if needed
//     const liters = extractedData.isGallons ? 
//       extractedData.quantity * 3.78541 : 
//       extractedData.quantity;
//     const pricePerLiter = extractedData.isGallons ? 
//       extractedData.unitPrice / 3.78541 : 
//       extractedData.unitPrice;
//     // Save to database
//     console.log('Saving to database...');
//     const refuelingData = await prisma.refueling.create({
//       data: {
//         date: new Date(),
//         time: new Date().toLocaleTimeString(),
//         odometer: parseInt(req.body.odometer) || 0,
//         kindOfFuel: req.body.kindOfFuel || 'Regular',
//         pricePerLiter: parseFloat(pricePerLiter.toFixed(2)),
//         totalCost: extractedData.totalCost,
//         liters: parseFloat(liters.toFixed(2)),
//         gasStation: req.body.gasStation || 'Unknown',
//         driver: req.body.driver || 'Unknown',
//         fileAttachment: imagePath,
//         notes: req.body.notes || '',
//         license_plate: req.body.license_plate || '',
//       }
//     });
//     res.status(201).json({
//       message: 'Receipt processed successfully',
//       extractedData: {
//         pricePerLiter: pricePerLiter.toFixed(2),
//         totalCost: extractedData.totalCost,
//         liters: liters.toFixed(2),
//         originalValues: {
//           unitPrice: extractedData.unitPrice,
//           quantity: extractedData.quantity,
//           isGallons: extractedData.isGallons
//         }
//       },
//       savedRecord: refuelingData
//     });
//   } catch (error) {
//     console.error('Error during receipt scan:', error);
//     res.status(500).json({ 
//       error: 'Failed to process the receipt', 
//       details: error.message 
//     });
//   }
// };
// // Test route
// router.get('/test', (req, res) => {
//   res.status(200).json({ message: 'Test route is working' });
// });
// // Scanning route
// router.post('/scan', upload.single('receiptImage'), scanReceipt);
// export default router;
//try by huggingface
// import express, { Request, Response, RequestHandler } from 'express';
// import multer from 'multer';
// import Tesseract from 'tesseract.js';
// import { HfInference } from '@huggingface/inference';
// import { PrismaClient } from '@prisma/client';
// import fs from 'fs';
// import path from 'path';
// const prisma = new PrismaClient();
// const router = express.Router();
// // Create uploads directory if it doesn't exist
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       const error: Error = new Error('Only image files are allowed!');
//       error.name = 'LIMIT_FILE_TYPES';
//       cb(error);
//       return;
//     }
//     cb(null, true);
//   }
// });
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }
// const scanReceipt: RequestHandler = async (req: MulterRequest, res: Response): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ error: 'Receipt image is required' });
//       return;
//     }
//     const imagePath = req.file.path;
//     // Step 1: Perform OCR
//     console.log('Starting OCR processing...');
//     const ocrResult = await Tesseract.recognize(imagePath, 'eng');
//     const extractedText = ocrResult.data.text;
//     console.log('Extracted text:', extractedText);
//     try {
//       // Step 2: Use Hugging Face
//       console.log('Processing with Hugging Face...');
//       const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
//       const prompt = `
//         Extract the following information from this gas receipt:
//         1. Price per unit (look for numbers near "price", "rate", or "$")
//         2. Quantity (look for numbers near "gallons", "liters", "L", or "gal")
//         3. Total cost (look for numbers near "total" or final amount)
//         Format the response as a JSON object with these exact keys:
//         {
//           "unitPrice": (number),
//           "quantity": (number),
//           "isGallons": (boolean),
//           "totalCost": (number)
//         }
//         Receipt text:
//         ${extractedText}
//       `;
//       // const response = await hf.textGeneration({
//       //   model: 'mistralai/Mistral-7B-Instruct-v0.1',  // Using Mistral model
//       //   inputs: prompt,
//       //   parameters: {
//       //     max_new_tokens: 200,
//       //     temperature: 0.1,  // Lower temperature for more consistent results
//       //     return_full_text: false
//       //   }
//       // });
//       const response = await hf.textGeneration({
//         model: 'gpt2',  // Using a more reliable model
//         inputs: prompt,
//         parameters: {
//           max_new_tokens: 200,
//           temperature: 0.1,
//           return_full_text: false
//         }
//       });
//       let extractedData;
//       try {
//         // Find the JSON object in the response
//         const jsonMatch = response.generated_text.match(/\{[\s\S]*\}/);
//         if (jsonMatch) {
//           extractedData = JSON.parse(jsonMatch[0]);
//         } else {
//           throw new Error('No JSON found in response');
//         }
//       } catch (parseError) {
//         console.error('Failed to parse Hugging Face response:', response.generated_text);
//         throw new Error('Failed to parse receipt data');
//       }
//       // Convert to liters if needed
//       const liters = extractedData.isGallons ? 
//         extractedData.quantity * 3.78541 : 
//         extractedData.quantity;
//       const pricePerLiter = extractedData.isGallons ? 
//         extractedData.unitPrice / 3.78541 : 
//         extractedData.unitPrice;
//       // Save to database
//       const refuelingData = await prisma.refueling.create({
//         data: {
//           date: new Date(),
//           time: new Date().toLocaleTimeString(),
//           odometer: parseInt(req.body.odometer) || 0,
//           kindOfFuel: req.body.kindOfFuel || 'Regular',
//           pricePerLiter: parseFloat(pricePerLiter.toFixed(2)),
//           totalCost: extractedData.totalCost,
//           liters: parseFloat(liters.toFixed(2)),
//           gasStation: req.body.gasStation || 'Unknown',
//           driver: req.body.driver || 'Unknown',
//           fileAttachment: imagePath,
//           notes: req.body.notes || '',
//           license_plate: req.body.license_plate || '',
//         }
//       });
//       res.status(201).json({
//         message: 'Receipt processed successfully',
//         extractedData: {
//           pricePerLiter: pricePerLiter.toFixed(2),
//           totalCost: extractedData.totalCost,
//           liters: liters.toFixed(2),
//           originalValues: extractedData
//         },
//         savedRecord: refuelingData
//       });
//     } catch (hfError) {
//       console.error('Hugging Face processing failed:', hfError);
//       res.status(500).json({ 
//         error: 'AI processing failed', 
//         details: hfError.message,
//         extractedText 
//       });
//     }
//   } catch (error) {
//     console.error('Error during receipt scan:', error);
//     res.status(500).json({ 
//       error: 'Failed to process the receipt', 
//       details: error.message 
//     });
//   }
// };
// //router.post('/scan', upload.single('receipt'), scanReceipt);
// router.post('/scan', (req, res, next) => {
//   upload.single('receipt')(req, res, (err) => {
//     if (err) {
//       if (err.name === 'LIMIT_FILE_TYPES') {
//         return res.status(400).json({ error: 'Only image files are allowed!' });
//       }
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ error: err.message });
//       }
//       return res.status(500).json({ error: 'File upload error' });
//     }
//     scanReceipt(req, res, next);
//   });
// });
// export default router;
//try by gemini
// import express, { Request, Response, RequestHandler } from 'express';
// import multer from 'multer';
// import Tesseract from 'tesseract.js';
// import { PrismaClient } from '@prisma/client';
// import fs from 'fs';
// import path from 'path';
// import { VertexAI } from '@google-cloud/aiplatform';
// const prisma = new PrismaClient();
// const router = express.Router();
// // Create uploads directory if it doesn't exist
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)){
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       const error: Error = new Error('Only image files are allowed!');
//       error.name = 'LIMIT_FILE_TYPES';
//       cb(error);
//       return;
//     }
//     cb(null, true);
//   }
// });
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }
// const scanReceipt: RequestHandler = async (req: MulterRequest, res: Response): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ error: 'Receipt image is required' });
//       return;
//     }
//     const imagePath = req.file.path;
//     // Step 1: Perform OCR
//     console.log('Starting OCR processing...');
//     const ocrResult = await Tesseract.recognize(imagePath, 'eng');
//     const extractedText = ocrResult.data.text;
//     console.log('Extracted text:', extractedText);
//     try {
//       // Step 2: Use Google Cloud Vertex AI (Gemini) for further processing
//       console.log('Processing with Google Gemini...');
//       // Initialize the Vertex AI client
//       const client = new VertexAI.PredictionServiceClient();
//       const endpoint = `projects/${process.env.GOOGLE_PROJECT_ID}/locations/us-central1/endpoints/${process.env.GEMINI_ENDPOINT_ID}`;
//       const parameters = {
//         instances: [{
//           content: extractedText
//         }],
//         parameters: {}
//       };
//       // Call the Gemini model
//       const [response] = await client.predict({ endpoint, instances: parameters.instances });
//       const generatedText = response.predictions[0];
//       console.log('Google Gemini response:', generatedText);
//       let extractedData;
//       try {
//         // Find the JSON object in the response
//         const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//         if (jsonMatch) {
//           extractedData = JSON.parse(jsonMatch[0]);
//         } else {
//           throw new Error('No JSON found in response');
//         }
//       } catch (parseError) {
//         console.error('Failed to parse Gemini response:', generatedText);
//         throw new Error('Failed to parse receipt data');
//       }
//       // Convert to liters if needed
//       const liters = extractedData.isGallons ? 
//         extractedData.quantity * 3.78541 : 
//         extractedData.quantity;
//       const pricePerLiter = extractedData.isGallons ? 
//         extractedData.unitPrice / 3.78541 : 
//         extractedData.unitPrice;
//       // Save to database
//       const refuelingData = await prisma.refueling.create({
//         data: {
//           date: new Date(),
//           time: new Date().toLocaleTimeString(),
//           odometer: parseInt(req.body.odometer) || 0,
//           kindOfFuel: req.body.kindOfFuel || 'Regular',
//           pricePerLiter: parseFloat(pricePerLiter.toFixed(2)),
//           totalCost: extractedData.totalCost,
//           liters: parseFloat(liters.toFixed(2)),
//           gasStation: req.body.gasStation || 'Unknown',
//           driver: req.body.driver || 'Unknown',
//           fileAttachment: imagePath,
//           notes: req.body.notes || '',
//           license_plate: req.body.license_plate || '',
//         }
//       });
//       res.status(201).json({
//         message: 'Receipt processed successfully',
//         extractedData: {
//           pricePerLiter: pricePerLiter.toFixed(2),
//           totalCost: extractedData.totalCost,
//           liters: liters.toFixed(2),
//           originalValues: extractedData
//         },
//         savedRecord: refuelingData
//       });
//     } catch (aiError) {
//       console.error('Gemini processing failed:', aiError);
//       res.status(500).json({ 
//         error: 'AI processing failed', 
//         details: aiError.message,
//         extractedText 
//       });
//     }
//   } catch (error) {
//     console.error('Error during receipt scan:', error);
//     res.status(500).json({ 
//       error: 'Failed to process the receipt', 
//       details: error.message 
//     });
//   }
// };
// //router.post('/scan', upload.single('receipt'), scanReceipt);
// router.post('/scan', (req, res, next) => {
//   upload.single('receipt')(req, res, (err) => {
//     if (err) {
//       if (err.name === 'LIMIT_FILE_TYPES') {
//         return res.status(400).json({ error: 'Only image files are allowed!' });
//       }
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ error: err.message });
//       }
//       return res.status(500).json({ error: 'File upload error' });
//     }
//     scanReceipt(req, res, next);
//   });
// });
// export default router;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const generative_ai_1 = require("@google/generative-ai");
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// Initialize Gemini
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Multer setup remains the same...
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
    }
});
// const scanReceipt: RequestHandler = async (req: MulterRequest, res: Response): Promise<void> => {
//     try {
//         if (!req.file) {
//             res.status(400).json({ error: 'Receipt image is required' });
//             return;
//         }
//         const imagePath = req.file.path;
//         // Step 1: Perform OCR
//         console.log('Starting OCR processing...');
//         const ocrResult = await Tesseract.recognize(imagePath, 'eng');
//         const extractedText = ocrResult.data.text;
//         console.log('Extracted text:', extractedText);
//         try {
//             // Step 2: Use Gemini
//             console.log('Processing with Gemini...');
//             const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//             const prompt = `
//                 Extract the following information from this gas receipt:
//                 1. Price per unit (look for numbers near "price", "rate", or "$")
//                 2. Quantity (look for numbers near "gallons", "liters", "L", or "gal")
//                 3. Total cost (look for numbers near "total" or final amount)
//                 Format the response EXACTLY as a JSON object with these exact keys, and nothing else:
//                 {
//                     "unitPrice": (number),
//                     "quantity": (number),
//                     "isGallons": (boolean),
//                     "totalCost": (number)
//                 }
//                 Receipt text:
//                 ${extractedText}
//             `;
//             const result = await model.generateContent(prompt);
//             const response = await result.response;
//             const responseText = response.text();
//             let extractedData;
//             try {
//                 // Find the JSON object in the response
//                 const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//                 if (jsonMatch) {
//                     extractedData = JSON.parse(jsonMatch[0]);
//                 } else {
//                     throw new Error('No JSON found in response');
//                 }
//             } catch (parseError) {
//                 console.error('Failed to parse Gemini response:', responseText);
//                 throw new Error('Failed to parse receipt data');
//             }
//             // Convert to liters if needed
//             const liters = extractedData.isGallons ? 
//                 extractedData.quantity * 3.78541 : 
//                 extractedData.quantity;
//             const pricePerLiter = extractedData.isGallons ? 
//                 extractedData.unitPrice / 3.78541 * 3.55 : 
//                 extractedData.unitPrice;
//             // Save to database
//             const refuelingData = await prisma.refueling.create({
//                 data: {
//                     date: new Date(),
//                     time: new Date().toLocaleTimeString(),
//                     odometer: parseInt(req.body.odometer) || 0,
//                     kindOfFuel: req.body.kindOfFuel || 'Regular',
//                     pricePerLiter: parseFloat(pricePerLiter.toFixed(2)),
//                     totalCost: extractedData.totalCost,
//                     liters: parseFloat(liters.toFixed(2)),
//                     gasStation: req.body.gasStation || 'Unknown',
//                     driver: req.body.driver || 'Unknown',
//                     fileAttachment: imagePath,
//                     notes: req.body.notes || '',
//                     license_plate: req.body.license_plate || '',
//                 }
//             });
//             res.status(201).json({
//                 message: 'Receipt processed successfully',
//                 extractedData: {
//                     pricePerLiter: pricePerLiter.toFixed(2),
//                     totalCost: extractedData.totalCost,
//                     liters: liters.toFixed(2),
//                     originalValues: extractedData
//                 },
//                 savedRecord: refuelingData
//             });
//         } catch (geminiError) {
//             console.error('Gemini processing failed:', geminiError);
//             res.status(500).json({ 
//                 error: 'AI processing failed', 
//                 details: geminiError.message,
//                 extractedText 
//             });
//         }
//     } catch (error) {
//         console.error('Error during receipt scan:', error);
//         res.status(500).json({ 
//             error: 'Failed to process the receipt', 
//             details: error.message 
//         });
//     }
// };
const scanReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'Receipt image is required' });
            return;
        }
        const imagePath = req.file.path;
        // OCR processing remains the same...
        console.log('Starting OCR processing...');
        const ocrResult = yield tesseract_js_1.default.recognize(imagePath, 'eng');
        const extractedText = ocrResult.data.text;
        try {
            console.log('Processing with Gemini...');
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            // Prompt remains the same...
            const prompt = `
              Extract the following information from this gas receipt:
              1. Price per unit (look for numbers near "price", "rate", or "$")
              2. Quantity (look for numbers near "gallons", "liters", "L", or "gal")
              3. Total cost (look for numbers near "total" or final amount)

              Format the response EXACTLY as a JSON object with these exact keys, and nothing else:
              {
                  "unitPrice": (number),
                  "quantity": (number),
                  "isGallons": (boolean),
                  "totalCost": (number)
              }

              Receipt text:
              ${extractedText}
          `;
            const result = yield model.generateContent(prompt);
            const responseText = (yield result.response).text();
            let extractedData;
            try {
                const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    extractedData = JSON.parse(jsonMatch[0]);
                }
                else {
                    throw new Error('No JSON found in response');
                }
            }
            catch (parseError) {
                console.error('Failed to parse Gemini response:', responseText);
                throw new Error('Failed to parse receipt data');
            }
            // Conversion constants
            const SHEKEL_RATE = 3.6; // 1 USD = 3.6 ILS
            const LITERS_PER_GALLON = 3.78541;
            // Calculate values in both formats
            let gallons, liters, pricePerGallon, pricePerLiter, totalCostUSD, totalCostILS;
            if (extractedData.isGallons) {
                gallons = extractedData.quantity;
                liters = gallons * LITERS_PER_GALLON;
                pricePerGallon = extractedData.unitPrice;
                pricePerLiter = pricePerGallon / LITERS_PER_GALLON;
                totalCostUSD = extractedData.totalCost;
            }
            else {
                liters = extractedData.quantity;
                gallons = liters / LITERS_PER_GALLON;
                pricePerLiter = extractedData.unitPrice;
                pricePerGallon = pricePerLiter * LITERS_PER_GALLON;
                totalCostUSD = extractedData.totalCost;
            }
            // Convert to ILS
            totalCostILS = totalCostUSD * SHEKEL_RATE;
            const pricePerLiterILS = pricePerLiter * SHEKEL_RATE;
            // Save to database in ILS and liters
            const refuelingData = yield prisma.refueling.create({
                data: {
                    date: new Date(),
                    time: new Date().toLocaleTimeString(),
                    odometer: parseInt(req.body.odometer) || 0,
                    kindOfFuel: req.body.kindOfFuel || 'Regular',
                    pricePerLiter: parseFloat(pricePerLiterILS.toFixed(2)), // Save in ILS
                    totalCost: parseFloat(totalCostILS.toFixed(2)), // Save in ILS
                    liters: parseFloat(liters.toFixed(2)), // Save in liters
                    gasStation: req.body.gasStation || 'Unknown',
                    driver: req.body.driver || 'Unknown',
                    fileAttachment: imagePath,
                    notes: req.body.notes || '',
                    license_plate: req.body.license_plate || '',
                }
            });
            // Return both formats in response
            res.status(201).json({
                message: 'Receipt processed successfully',
                extractedData: {
                    usd: {
                        pricePerGallon: pricePerGallon.toFixed(2),
                        totalCost: totalCostUSD.toFixed(2),
                        gallons: gallons.toFixed(2)
                    },
                    ils: {
                        pricePerLiter: pricePerLiterILS.toFixed(2),
                        totalCost: totalCostILS.toFixed(2),
                        liters: liters.toFixed(2)
                    },
                    originalValues: extractedData
                },
                savedRecord: refuelingData
            });
        }
        catch (geminiError) {
            console.error('Gemini processing failed:', geminiError);
            res.status(500).json({
                error: 'AI processing failed',
                details: geminiError.message,
                extractedText
            });
        }
    }
    catch (error) {
        console.error('Error during receipt scan:', error);
        res.status(500).json({
            error: 'Failed to process the receipt',
            details: error.message
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
