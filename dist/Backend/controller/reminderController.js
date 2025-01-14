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
exports.initializeReminders = exports.router = exports.reminderService = void 0;
// reminderController.ts
//import cron from 'node-cron';
const express_1 = __importDefault(require("express"));
const reminderService_js_1 = require("../services/reminderService.js");
exports.reminderService = new reminderService_js_1.ReminderService();
const router = express_1.default.Router();
exports.router = router;
// Create a new reminder
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const reminder = yield exports.reminderService.createReminder(data);
        // Trigger reminder email scheduling
        yield exports.reminderService.scheduleReminderEmail(reminder);
        res.status(201).json(reminder);
    }
    catch (error) {
        console.error("Error creating reminder:", error);
        res.status(500).json({ error: 'Failed to create reminder' });
    }
}));
// Get all reminders
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminders = yield exports.reminderService.getAllReminders();
        res.json(reminders);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reminders' });
    }
}));
// Update a reminder
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedReminder = yield exports.reminderService.updateReminder(Number(req.params.id), req.body);
        res.json(updatedReminder);
    }
    catch (error) {
        console.error("Error updating reminder:", error); // Log the error
        res.status(500).json({ error: error.message || 'Failed to update reminder' });
    }
}));
// Delete a reminder
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.reminderService.deleteReminder(Number(req.params.id));
        res.status(200).json({ message: 'Reminder deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
}));
router.post('/reminders/complete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedReminder = yield exports.reminderService.updateReminder(Number(id), { completed: true });
        res.status(200).json({ message: 'Reminder marked as completed!', updatedReminder });
    }
    catch (error) {
        console.error("Error marking reminder as completed:", error);
        res.status(500).json({ error: 'Failed to mark reminder as completed.' });
    }
}));
// Initialize reminders when the application starts
const initializeReminders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.reminderService.initializeReminders();
        console.log('Reminders initialized successfully');
    }
    catch (error) {
        console.error("Error initializing reminders:", error);
    }
});
exports.initializeReminders = initializeReminders;
router.get('/complete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminderId = Number(req.params.id);
        if (isNaN(reminderId)) {
            res.status(400).json({ error: 'Invalid reminder ID' });
            return;
        }
        yield exports.reminderService.markAsComplete(reminderId);
        // Respond with a simple success message
        res.json({ message: 'Reminder marked as complete!' });
    }
    catch (error) {
        console.error("Error marking reminder as complete:", error);
        res.status(500).json({ error: error.message || 'Failed to mark reminder as complete' });
    }
}));
