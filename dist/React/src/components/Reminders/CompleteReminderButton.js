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
// CompleteReminderButton.tsx
const react_1 = __importDefault(require("react"));
const CompleteReminderButton = ({ reminderId, onComplete }) => {
    const markAsComplete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/reminders/complete/${reminderId}`, {
                method: 'GET', // Ensure this matches your backend route
            });
            if (!response.ok) {
                throw new Error('Failed to mark reminder as complete');
            }
            // Call the onComplete callback to show the success message
            onComplete();
        }
        catch (error) {
            console.error(error);
            alert('Failed to mark reminder as complete');
        }
    });
    return (react_1.default.createElement("button", { onClick: markAsComplete }, "Mark as Complete"));
};
exports.default = CompleteReminderButton;
