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
const add_carService_js_1 = require("../services/add_carService.js"); // Business logic for handling car operations
const carService = new add_carService_js_1.CarService();
const router = express_1.default.Router();
// Create a new car record
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // Cast incoming data to CarDto
        const car = yield carService.createCar(data);
        res.status(201).json(car);
    }
    catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Failed to create car' });
    }
}));
// Get all car records
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield carService.getAllCars();
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cars' });
    }
}));
// Update a car record
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCar = yield carService.updateCar(Number(req.params.id), req.body);
        res.json(updatedCar);
    }
    catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Failed to update car' });
    }
}));
// Delete a car record
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield carService.deleteCar(Number(req.params.id));
        res.status(200).json({ message: 'Car deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
}));
exports.default = router;
