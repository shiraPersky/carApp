import express, { Request, Response } from 'express';
import { CarService } from '../services/add_carService.js'; // Business logic for handling car operations
import { CarDto } from '../dto/add_carDto.js'; // DTO for car

const carService = new CarService();

const router = express.Router();

// Create a new car record
router.post('/', async (req: Request, res: Response) => {
  try {
    const data: CarDto = req.body; // Cast incoming data to CarDto
    const car = await carService.createCar(data);
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
});

// Get all car records
router.get('/', async (req: Request, res: Response) => {
  try {
    const cars = await carService.getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cars' });
  }
});

// Update a car record
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedCar = await carService.updateCar(Number(req.params.id), req.body);
    res.json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
  }
});

// Delete a car record
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await carService.deleteCar(Number(req.params.id));
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

export default router;
