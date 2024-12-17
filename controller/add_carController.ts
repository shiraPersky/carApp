import express, { Request, Response } from 'express';
import { CarService } from '../services/add_carService';
import { CarDto } from '../dto/add_carDto';

const carService = new CarService();
const router = express.Router();

// Create a new car
router.post('/', async (req: Request, res: Response) => {
  try {
    const data: CarDto = req.body; // Cast incoming data to CarDto
    const car = await carService.createCar(data);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create car' });
  }
});

// Get all cars
router.get('/', async (req: Request, res: Response) => {
  try {
    const cars = await carService.getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cars' });
  }
});

// Get a car by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const car = await carService.getCarById(Number(req.params.id));
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve car' });
  }
});

// Update a car
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedCar = await carService.updateCar(Number(req.params.id), req.body);
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car' });
  }
});

// Delete a car
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await carService.deleteCar(Number(req.params.id));
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

export default router;
