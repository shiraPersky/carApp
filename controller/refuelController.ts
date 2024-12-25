import express, { Request, Response } from 'express';
import { RefuelingService } from '../services/refuelService.js'; // Business logic for handling refueling operations
import { RefuelingDto } from '../dto/refuelDto.js'; // DTO for refueling

const refuelingService = new RefuelingService();

const router = express.Router();

// Create a new refueling record
router.post('/', async (req: Request, res: Response) => {
  try {
    const data: RefuelingDto = req.body; // Cast incoming data to RefuelingDto
    const refueling = await refuelingService.createRefueling(data);
    res.status(201).json(refueling);
  } catch (error) {
    console.error("Error creating refueling:", error);
    res.status(500).json({ error: 'Failed to create refueling' });
  }
});

// Get all refueling records
router.get('/', async (req: Request, res: Response) => {
  try {
    const refuelings = await refuelingService.getAllRefuelings();
    res.json(refuelings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve refuelings' });
  }
});

// Update a refueling record
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedRefueling = await refuelingService.updateRefueling(Number(req.params.id), req.body);
    res.json(updatedRefueling);
  } catch (error) {
    console.error('Error during refuel update:', error);//test
    res.status(500).json({ error: 'Failed to update refueling' });
  }
});

// Delete a refueling record
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await refuelingService.deleteRefueling(Number(req.params.id));
    res.status(200).json({ message: 'Refueling deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete refueling' });
  }
});

export default router;
