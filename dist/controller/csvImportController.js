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
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios")); //Used for making HTTP requests to external services
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router(); //Initializes an Express Router to define routes for the API
// Function to fetch and search CSV data from data.gov.il
const findCarInRemoteCSV = (licensePlate) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try { // HTTP GET request to the data.gov.il
        const response = yield axios_1.default.get('https://data.gov.il/api/3/action/datastore_search', {
            params: {
                resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
                q: licensePlate,
                limit: 1
            }
        });
        const data = response.data; //Extracts the response data from the API request
        if (data.success && data.result.records.length > 0) {
            const record = data.result.records[0];
            return {
                license_plate: (_a = record.mispar_rechev) === null || _a === void 0 ? void 0 : _a.toString(),
                make: record.tozeret_nm,
                model: record.kinuy_mishari,
                year: parseInt(record.shnat_yitzur),
                color: record.tzeva_rechev,
                emission_group: record.kvutzat_zihum,
                valid_until: record.tokef_dt ? new Date(record.tokef_dt) : null,
                trim_level: record.ramat_gimur,
                last_test: record.mivchan_acharon_dt ? new Date(record.mivchan_acharon_dt) : null,
                model_type: record.sug_degem,
                model_number: record.degem_cd
            };
        }
        return null; //If no records are found, it returns null
    }
    catch (error) {
        console.error('Error fetching data from data.gov.il:', error);
        throw error;
    }
});
// Route to search for a car by license plate
router.get('/search/:license_plate', (req, res) => {
    const { license_plate } = req.params; //Extracts the license_plate from the route parameters.
    findCarInRemoteCSV(license_plate)
        .then(carData => {
        if (carData) {
            res.status(200).json({
                message: 'Car found in database',
                car: carData
            });
        }
        else {
            res.status(404).json({
                error: 'Car not found',
                message: `Vehicle with license plate ${license_plate} was not found in the database`
            });
        }
    })
        .catch(error => {
        console.error('Error searching vehicle:', error);
        res.status(500).json({
            error: 'Search failed',
            message: 'An error occurred while searching the vehicle database'
        });
    });
});
// Route to import a car to local database
router.post('/import/:license_plate', (req, res) => {
    const { license_plate } = req.params;
    // First check if car exists in database
    prisma.car.findUnique({
        where: { license_plate },
    })
        .then(existingCar => {
        if (existingCar) {
            res.status(409).json({
                error: 'Car already exists',
                message: 'This vehicle is already in the database'
            });
            return null;
        }
        return findCarInRemoteCSV(license_plate);
    })
        .then(carData => {
        if (!carData) {
            return;
        }
        return prisma.car.create({
            data: carData,
        });
    })
        .then(importedCar => {
        if (importedCar) {
            res.status(201).json({
                message: 'Vehicle successfully imported to database',
                car: importedCar
            });
        }
    })
        .catch(error => {
        console.error('Error importing car:', error);
        res.status(500).json({
            error: 'Import failed',
            message: 'An error occurred while importing the vehicle data'
        });
    });
});
exports.default = router;
