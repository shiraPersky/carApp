// reminderController.ts
import express, { Request, Response } from 'express';
import { ReminderService } from '../services/reminderService.js';
import { ReminderDto } from '../dto/reminderDto.js';

const reminderService = new ReminderService();
const router = express.Router();

// Create a new reminder
router.post('/', async (req: Request, res: Response) => {
  try {
    const data: ReminderDto = req.body;
    const reminder = await reminderService.createReminder(data);
    // Trigger reminder email scheduling
    await reminderService.scheduleReminderEmail(reminder);
    res.status(201).json(reminder);
  } catch (error) {
    console.error("Error creating reminder:", error);
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});


// Get all reminders
router.get('/', async (_req: Request, res: Response) => {
  try {
    const reminders = await reminderService.getAllReminders();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reminders' });
  }
});

// Update a reminder
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedReminder = await reminderService.updateReminder(Number(req.params.id), req.body);
    res.json(updatedReminder);
  } catch (error) {
    console.error("Error updating reminder:", error); // Log the error
    res.status(500).json({ error: error.message || 'Failed to update reminder' });
  }
});

// Delete a reminder
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await reminderService.deleteReminder(Number(req.params.id));
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reminder' });
  }
});

// Initialize reminders when the application starts
const initializeReminders = async () => {
  try {
    await reminderService.initializeReminders();
    console.log('Reminders initialized successfully');
  } catch (error) {
    console.error("Error initializing reminders:", error);
  }
};

export { router, initializeReminders };
