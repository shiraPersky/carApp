"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ReminderForm_1 = __importDefault(require("../../components/Reminders/ReminderForm")); // Import your ReminderForm
const serviceApi_1 = require("../../services/serviceApi"); // Adjust to your service API
const EditReminderPage = () => {
    const { id } = (0, react_router_dom_1.useParams)(); // Get the reminder ID from the URL
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [reminder, setReminder] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [reminders, setReminders] = (0, react_1.useState)([]);
    // Fetch all reminders and then find the specific one by ID
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
    // Once reminders are fetched, find the specific reminder by ID
    (0, react_1.useEffect)(() => {
        if (id && reminders.length > 0) {
            const foundReminder = reminders.find((reminder) => reminder.id === Number(id));
            setReminder(foundReminder || null);
            setLoading(false); // Stop loading when the reminder is found
        }
    }, [id, reminders]); // Only run when reminders or id change
    // Handle form submission
    const handleSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Submitting update with data:", data); // Test log data being sent to API
        try {
            const { id } = data, reminderData = __rest(data, ["id"]); // Remove id from data if it's part of the form data
            yield (0, serviceApi_1.updateReminder)(Number(id), data); // Update the reminder by ID
            navigate('/reminders'); // Navigate back to the reminders list
        }
        catch (error) {
            console.error('Error updating reminder:', error);
        }
    });
    if (loading)
        return react_1.default.createElement("div", null, "Loading..."); // Show loading while fetching data
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Edit Reminder"),
        react_1.default.createElement(ReminderForm_1.default, { existingReminder: reminder, onSubmit: handleSubmit })));
};
exports.default = EditReminderPage;
