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
exports.processReceipt = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const generative_ai_1 = require("@google/generative-ai");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Conversion constants
const SHEKEL_RATE = 3.6; // 1 USD = 3.6 ILS
const LITERS_PER_GALLON = 3.78541;
const processReceipt = (imagePath, odometer, kindOfFuel, gasStation, driver, notes, licensePlate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // OCR processing
        console.log('Starting OCR processing...');
        const ocrResult = yield tesseract_js_1.default.recognize(imagePath, 'eng');
        const extractedText = ocrResult.data.text;
        console.log('Processing with Gemini...');
        // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const prompt = `
            Extract the following information from this gas receipt:
            1. Price per unit (look for numbers near "price", "rate", or "$").
            2. Quantity (look for numbers near "gallons", "liters", "L", or "gal").
            3. Total cost (look for numbers near "total" or final amount).
            4. Date of transaction (e.g., "MM/DD/YYYY" or similar formats).
            5. Time of transaction (e.g., "HH:MM AM/PM" or similar formats).

            Format the response EXACTLY as a JSON object with these exact keys, and nothing else:
            {
                "unitPrice": (number),
                "quantity": (number),
                "isGallons": (boolean),
                "totalCost": (number),
                "date": (string),
                "time": (string)
            }

            Receipt text:
            ${extractedText}
        `;
        const result = yield model.generateContent(prompt);
        const responseText = (yield result.response).text();
        let extractedData;
        try {
            /*explanation of the regex on the next line:
            /.../-start and end of the regular expression
            \{ -Start with {
            [\s\S] - ensures all characters are matched,even new lines(\s → Matches any whitespace character,\S- Matches any non-whitespace character.)
            *- captures everything inside

            */
            const jsonMatch = responseText.match(/\{[\s\S]*\}/); //extracts the first object
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
        totalCostILS = totalCostUSD * SHEKEL_RATE;
        const pricePerLiterILS = pricePerLiter * SHEKEL_RATE;
        // Save to the database
        const refuelingData = yield prisma.refueling.create({
            data: {
                date: extractedData.date ? new Date(extractedData.date) : new Date(),
                time: extractedData.time || new Date().toLocaleTimeString(),
                odometer: odometer || 0,
                kindOfFuel: kindOfFuel || 'Regular',
                pricePerLiter: parseFloat(pricePerLiterILS.toFixed(2)),
                totalCost: parseFloat(totalCostILS.toFixed(2)),
                liters: parseFloat(liters.toFixed(2)),
                gasStation: gasStation || 'Unknown',
                driver: driver || 'Unknown',
                fileAttachment: imagePath,
                notes: notes || '',
                license_plate: licensePlate || '',
            },
        });
        return {
            usd: {
                pricePerGallon: pricePerGallon.toFixed(2),
                totalCost: totalCostUSD.toFixed(2),
                gallons: gallons.toFixed(2),
            },
            ils: {
                pricePerLiter: pricePerLiterILS.toFixed(2),
                totalCost: totalCostILS.toFixed(2),
                liters: liters.toFixed(2),
            },
            originalValues: extractedData,
            savedRecord: refuelingData,
        };
    }
    catch (error) {
        console.error('Error during receipt processing:', error);
        throw error;
    }
});
exports.processReceipt = processReceipt;
