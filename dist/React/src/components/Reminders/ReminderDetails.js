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
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const serviceApi_1 = require("../../services/serviceApi");
const react_2 = __importDefault(require("react"));
const ReminderDetails = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [reminder, setReminder] = (0, react_1.useState)(null);
    const [reminders, setReminders] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchReminders = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/reminders'); // Fetch all reminders
                if (!response.ok) {
                    throw new Error('Failed to fetch reminders');
                }
                const data = yield response.json();
                setReminders(data);
            }
            catch (error) {
                console.error('Error fetching reminders:', error);
            }
        });
        fetchReminders();
    }, []); // Fetch all reminders once on component mount
    (0, react_1.useEffect)(() => {
        // Once reminders are fetched, find the reminder that matches the ID
        if (id && reminders.length > 0) {
            const foundReminder = reminders.find((reminder) => reminder.id === Number(id));
            setReminder(foundReminder || null);
        }
    }, [id, reminders]);
    // Handle delete operation
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteReminder)(Number(id)); // Call deleteReminder function
            navigate('/reminders');
        }
        catch (error) {
            console.error('Error deleting reminder:', error);
        }
    });
    if (!reminder)
        return react_2.default.createElement("div", null, "Loading...");
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Reminder Details"),
        react_2.default.createElement("p", null,
            "Description: ",
            reminder.description),
        react_2.default.createElement("p", null,
            "Start Date: ",
            new Date(reminder.start_date).toLocaleDateString()),
        react_2.default.createElement("p", null,
            "Start Odometer: ",
            reminder.start_odometer),
        react_2.default.createElement("p", null,
            "Due Date: ",
            new Date(reminder.due_date).toLocaleDateString()),
        react_2.default.createElement("p", null,
            "Next Due KM: ",
            reminder.next_due_km),
        react_2.default.createElement("p", null,
            "Repeat by Days: ",
            reminder.repeat_by_days),
        react_2.default.createElement("p", null,
            "Repeat by KM: ",
            reminder.repeat_by_km),
        react_2.default.createElement("p", null,
            "Notify Before Days: ",
            reminder.notify_before_days),
        react_2.default.createElement("p", null,
            "Notify Before KM: ",
            reminder.notify_before_km),
        react_2.default.createElement("p", null,
            "Completed: ",
            reminder.completed ? 'Yes' : 'No'),
        react_2.default.createElement("div", null,
            react_2.default.createElement(react_router_dom_1.Link, { to: `/reminders/edit/${reminder.id}` }, "Edit"),
            react_2.default.createElement("button", { onClick: handleDelete }, "Delete"))));
};
exports.default = ReminderDetails;
