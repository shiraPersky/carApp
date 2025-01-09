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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const odometerService_1 = require("../services/odometerService");
// Create a router instance
const router = (0, express_1.Router)();
// Define the route handler with RequestHandler type
const updateOdometerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { licensePlate, odometer } = req.body;
    // Validate request data
    if (!licensePlate || !odometer) {
        res.status(400).json({ message: 'License plate and odometer are required' });
        return;
    }
    try {
        // Call your OdometerService to update the odometer
        const updatedCar = yield odometerService_1.OdometerService.updateOdometer(licensePlate, odometer);
        res.status(200).json(updatedCar);
    }
    catch (error) {
        console.error('Error during odometer update:', error);
        res.status(500).json({ message: 'Failed to update odometer' });
    }
});
// Register the route handler
router.put('/update-odometer', updateOdometerHandler);
exports.default = router;
