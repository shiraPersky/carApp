"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const serviceService_js_1 = require("../services/serviceService.js"); //This service contains the business logic for handling Service operations.
const serviceService = new serviceService_js_1.ServiceService();
const router = express_1.default.Router(); //For define routes for handling API requests.

const serviceService_1 = require("../services/serviceService"); //This service contains the business logic for handling Service operations.
const serviceService = new serviceService_1.ServiceService();
const router = express_1.default.Router(); //For define routes for handling API requests.
// Create a new service
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // Cast incoming data to ServiceDto
        const service = yield serviceService.createService(data);
        res.status(201).json(service);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create service' });
    }
}));
// Get all services
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield serviceService.getAllServices();
        res.json(services);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve services' });
    }

}));
// Update a service
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedService = yield serviceService.updateService(Number(req.params.id), req.body);
        res.json(updatedService);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update service' });
    }

}));
// Delete a service
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield serviceService.deleteService(Number(req.params.id));
        res.status(200).json({ message: 'Service deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
}));
exports.default = router;
