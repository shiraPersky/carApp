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
const serviceApi_1 = require("../../services/serviceApi");
const react_2 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ReminderList = () => {
    const [reminders, setReminders] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchReminders = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield (0, serviceApi_1.getReminders)();
                setReminders(data);
            }
            catch (error) {
                console.error('Error fetching reminders:', error);
            }
        });
        fetchReminders();
    }, []);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteReminder)(id);
            setReminders(reminders.filter((reminder) => reminder.id !== id));
        }
        catch (error) {
            console.error('Error deleting reminder:', error);
        }
    });
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Your Reminders"),
        react_2.default.createElement("div", { className: "reminder-grid" },
            react_2.default.createElement("h2", null, "One-Time Reminders"),
            reminders.filter(r => !r.repeat_by_days && !r.repeat_by_km).map(reminder => (react_2.default.createElement("div", { key: reminder.id, className: "reminder-card" },
                react_2.default.createElement("h3", null, reminder.description),
                react_2.default.createElement("p", null,
                    "Due Date: ",
                    new Date(reminder.due_date).toLocaleDateString())))),
            react_2.default.createElement("h2", null, "Repeating Reminders"),
            reminders.filter(r => r.repeat_by_days || r.repeat_by_km).map(reminder => (react_2.default.createElement("div", { key: reminder.id, className: "reminder-card" },
                react_2.default.createElement("h3", null, reminder.description),
                react_2.default.createElement("p", null,
                    "Repeat Every ",
                    reminder.repeat_by_days || 0,
                    " Days"),
                react_2.default.createElement("p", null,
                    "Repeat Every ",
                    reminder.repeat_by_km || 0,
                    " KM"))))),
        react_2.default.createElement("div", { className: "reminder-card add-button" },
            react_2.default.createElement(react_router_dom_1.Link, { to: "/reminders/add" }, "+"))));
};
exports.default = ReminderList;
