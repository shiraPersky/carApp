// import express, { Request, Response, RequestHandler } from 'express';
// import multer from 'multer';
// import Tesseract from 'tesseract.js';
// import OpenAI from 'openai';
// import { PrismaClient } from '@prisma/client';
// import { RefuelingDto } from '../dto/refuelDto.js';

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

import express, { Request, Response, RequestHandler } from 'express';
import multer from 'multer';
import Tesseract from 'tesseract.js';
import { HfInference } from '@huggingface/inference';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer storage
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      const error: Error = new Error('Only image files are allowed!');
      error.name = 'LIMIT_FILE_TYPES';
      cb(error);
      return;
    }
    cb(null, true);
  }
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

    // Step 1: Perform OCR
    console.log('Starting OCR processing...');
    const ocrResult = await Tesseract.recognize(imagePath, 'eng');
    const extractedText = ocrResult.data.text;
    console.log('Extracted text:', extractedText);

    try {
      // Step 2: Use Hugging Face
      console.log('Processing with Hugging Face...');
      const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
      
      const prompt = `
        Extract the following information from this gas receipt:
        1. Price per unit (look for numbers near "price", "rate", or "$")
        2. Quantity (look for numbers near "gallons", "liters", "L", or "gal")
        3. Total cost (look for numbers near "total" or final amount)

        Format the response as a JSON object with these exact keys:
        {
          "unitPrice": (number),
          "quantity": (number),
          "isGallons": (boolean),
          "totalCost": (number)
        }

        Receipt text:
        ${extractedText}
      `;

      // const response = await hf.textGeneration({
      //   model: 'mistralai/Mistral-7B-Instruct-v0.1',  // Using Mistral model
      //   inputs: prompt,
      //   parameters: {
      //     max_new_tokens: 200,
      //     temperature: 0.1,  // Lower temperature for more consistent results
      //     return_full_text: false
      //   }
      // });
      const response = await hf.textGeneration({
        model: 'gpt2',  // Using a more reliable model
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.1,
          return_full_text: false
        }
      });

      let extractedData;
      try {
        // Find the JSON object in the response
        const jsonMatch = response.generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          extractedData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse Hugging Face response:', response.generated_text);
        throw new Error('Failed to parse receipt data');
      }

      // Convert to liters if needed
      const liters = extractedData.isGallons ? 
        extractedData.quantity * 3.78541 : 
        extractedData.quantity;

      const pricePerLiter = extractedData.isGallons ? 
        extractedData.unitPrice / 3.78541 : 
        extractedData.unitPrice;

      // Save to database
      const refuelingData = await prisma.refueling.create({
        data: {
          date: new Date(),
          time: new Date().toLocaleTimeString(),
          odometer: parseInt(req.body.odometer) || 0,
          kindOfFuel: req.body.kindOfFuel || 'Regular',
          pricePerLiter: parseFloat(pricePerLiter.toFixed(2)),
          totalCost: extractedData.totalCost,
          liters: parseFloat(liters.toFixed(2)),
          gasStation: req.body.gasStation || 'Unknown',
          driver: req.body.driver || 'Unknown',
          fileAttachment: imagePath,
          notes: req.body.notes || '',
          license_plate: req.body.license_plate || '',
        }
      });

      res.status(201).json({
        message: 'Receipt processed successfully',
        extractedData: {
          pricePerLiter: pricePerLiter.toFixed(2),
          totalCost: extractedData.totalCost,
          liters: liters.toFixed(2),
          originalValues: extractedData
        },
        savedRecord: refuelingData
      });

    } catch (hfError) {
      console.error('Hugging Face processing failed:', hfError);
      res.status(500).json({ 
        error: 'AI processing failed', 
        details: hfError.message,
        extractedText 
      });
    }

  } catch (error) {
    console.error('Error during receipt scan:', error);
    res.status(500).json({ 
      error: 'Failed to process the receipt', 
      details: error.message 
    });
  }
};


//router.post('/scan', upload.single('receipt'), scanReceipt);
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