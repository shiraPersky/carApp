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
const serviceApi_1 = require("../../services/serviceApi"); // Adjust according to your service API
const react_router_dom_1 = require("react-router-dom");
const react_2 = __importDefault(require("react"));
const ReminderPage = () => {
    const [reminders, setReminders] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchReminders = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield (0, serviceApi_1.getReminders)(); // Fetch reminders from API
                setReminders(data);
            }
            catch (error) {
                console.error('Error fetching reminders:', error);
            }
        });
        fetchReminders();
    }, []); // Empty dependency array to run once on component mount
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteReminder)(id); // Delete reminder by ID
            setReminders(reminders.filter((reminder) => reminder.id !== id)); // Remove from state
        }
        catch (error) {
            console.error('Error deleting reminder:', error);
        }
    });
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Your Reminders"),
        react_2.default.createElement(react_router_dom_1.Link, { to: "/reminders/add" }, "Add New Reminder"),
        react_2.default.createElement("table", null,
            react_2.default.createElement("thead", null,
                react_2.default.createElement("tr", null,
                    react_2.default.createElement("th", null, "License Plate"),
                    react_2.default.createElement("th", null, "Description"),
                    react_2.default.createElement("th", null, "Start Date"),
                    react_2.default.createElement("th", null, "Start Odometer"),
                    react_2.default.createElement("th", null, "Due Date"),
                    react_2.default.createElement("th", null, "Next Due KM"),
                    react_2.default.createElement("th", null, "Repeat By Days"),
                    react_2.default.createElement("th", null, "Repeat By KM"),
                    react_2.default.createElement("th", null, "Notify Before Days"),
                    react_2.default.createElement("th", null, "Notify Before KM"),
                    react_2.default.createElement("th", null, "Completed"),
                    react_2.default.createElement("th", null, "Actions"))),
            react_2.default.createElement("tbody", null, reminders.map((reminder) => (react_2.default.createElement("tr", { key: reminder.id },
                react_2.default.createElement("td", null, reminder.license_plate),
                react_2.default.createElement("td", null, reminder.description),
                react_2.default.createElement("td", null, reminder.start_date ? new Date(reminder.start_date).toLocaleDateString() : '-'),
                react_2.default.createElement("td", null, reminder.start_odometer),
                react_2.default.createElement("td", null, reminder.due_date ? new Date(reminder.due_date).toLocaleDateString() : '-'),
                react_2.default.createElement("td", null, reminder.next_due_km),
                react_2.default.createElement("td", null, reminder.repeat_by_days),
                react_2.default.createElement("td", null, reminder.repeat_by_km),
                react_2.default.createElement("td", null, reminder.notify_before_days),
                react_2.default.createElement("td", null, reminder.notify_before_km),
                react_2.default.createElement("td", null, reminder.completed ? 'Yes' : 'No'),
                react_2.default.createElement("td", null,
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/reminders/edit/${reminder.id}` }, "Edit"),
                    react_2.default.createElement("button", { onClick: () => handleDelete(reminder.id) }, "Delete")))))))));
};
exports.default = ReminderPage;
