import express, { Request, Response } from 'express';
import { ServiceService } from '../services/serviceService.js';//This service contains the business logic for handling Service operations.
import { ServiceDto } from '../dto/serviceDto.js';

const serviceService = new ServiceService();

const router = express.Router();//For define routes for handling API requests.

// Create a new service
router.post('/', async (req: Request, res: Response) => {
  try {
    const data: ServiceDto = req.body; // Cast incoming data to ServiceDto
    const service = await serviceService.createService(data);
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);  // Log the error
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
});

// Update a service
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedService = await serviceService.updateService(Number(req.params.id), req.body);
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete a service
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await serviceService.deleteService(Number(req.params.id));
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;