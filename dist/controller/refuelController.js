"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refuelService_js_1 = require("../services/refuelService.js"); // Business logic for handling refueling operations
const refuelingService = new refuelService_js_1.RefuelingService();
const router = express_1.default.Router();
// Create a new refueling record
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Cast incoming data to RefuelingDto
        const refueling = await refuelingService.createRefueling(data);
        res.status(201).json(refueling);
    }
    catch (error) {
        console.error("Error creating refueling:", error);
        res.status(500).json({ error: 'Failed to create refueling' });
    }
});
// Get all refueling records
router.get('/', async (req, res) => {
    try {
        const refuelings = await refuelingService.getAllRefuelings();
        res.json(refuelings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve refuelings' });
    }
});
// Update a refueling record
router.put('/:id', async (req, res) => {
    try {
        const updatedRefueling = await refuelingService.updateRefueling(Number(req.params.id), req.body);
        res.json(updatedRefueling);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update refueling' });
    }
});
// Delete a refueling record
router.delete('/:id', async (req, res) => {
    try {
        await refuelingService.deleteRefueling(Number(req.params.id));
        res.status(200).json({ message: 'Refueling deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete refueling' });
    }
});
exports.default = router;
