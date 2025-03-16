"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const csvImportService_1 = require("../services/csvImportService");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const vehicleService = new csvImportService_1.VehicleService();
// Route to search for a car by license plate
router.get('/search/:license_plate', (req, res) => {
    const { license_plate } = req.params;
    vehicleService.findCarInRemoteCSV(license_plate)
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
        return vehicleService.findCarInRemoteCSV(license_plate);
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
