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
const serviceService_js_1 = require("../services/serviceService.js"); //This service contains the business logic for handling Service operations.
const serviceService = new serviceService_js_1.ServiceService();
const router = express_1.default.Router(); //For define routes for handling API requests.
// Create a new service
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // Cast incoming data to ServiceDto
        const service = yield serviceService.createService(data);
        res.status(201).json(service);
    }
    catch (error) {
        console.error("Error creating service:", error); // Log the error
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
// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const updatedService = await serviceService.updateService(Number(req.params.id), req.body);
//     res.json(updatedService);
//   } catch (error) {
//     console.error("Error updating service:", error); // Log the error
//     res.status(500).json({ error: error.message || 'Failed to update service' }); // Send actual error message
//   }
// });
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedService = yield serviceService.updateService(Number(req.params.id), req.body);
        res.json(updatedService);
    }
    catch (error) {
        console.error("Error updating service:", error);
        const message = error instanceof Error ? error.message : 'Failed to update service';
        // 👇 Return 400 if it's the license plate error
        const status = message === 'License plate does not exist' ? 400 : 500;
        res.status(status).json({ message });
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
