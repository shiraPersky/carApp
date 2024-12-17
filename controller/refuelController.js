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
const refuelService_js_1 = require("../services/refuelService.js"); // Business logic for handling refueling operations
const refuelingService = new refuelService_js_1.RefuelingService();
const router = express_1.default.Router();
// Create a new refueling record
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // Cast incoming data to RefuelingDto
        const refueling = yield refuelingService.createRefueling(data);
        res.status(201).json(refueling);
    }
    catch (error) {
        console.error("Error creating refueling:", error);
        res.status(500).json({ error: 'Failed to create refueling' });
    }
}));
// Get all refueling records
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refuelings = yield refuelingService.getAllRefuelings();
        res.json(refuelings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve refuelings' });
    }
}));
// Update a refueling record
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRefueling = yield refuelingService.updateRefueling(Number(req.params.id), req.body);
        res.json(updatedRefueling);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update refueling' });
    }
}));
// Delete a refueling record
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield refuelingService.deleteRefueling(Number(req.params.id));
        res.status(200).json({ message: 'Refueling deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete refueling' });
    }
}));
exports.default = router;
