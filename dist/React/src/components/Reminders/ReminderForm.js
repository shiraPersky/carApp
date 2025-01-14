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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const ReminderForm = ({ existingReminder, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({
        defaultValues: existingReminder || {},
    });
    const [activeTab, setActiveTab] = (0, react_1.useState)(""); // No tab active by default
    const [oneTimeOption, setOneTimeOption] = (0, react_1.useState)("date"); // "date" or "km"
    const [repeatOption, setRepeatOption] = (0, react_1.useState)({ date: false, km: false }); // Control for repeat options
    const handleFormSubmit = (data) => {
        // For one-time reminders (date or km-based)
        if (oneTimeOption === 'date') {
            data.repeat_by_days = null;
            data.repeat_by_km = null;
        }
        if (oneTimeOption === 'km') {
            data.repeat_by_days = null;
            data.repeat_by_km = null;
            data.due_date = null;
            data.start_date = null;
            data.start_odometer = null;
        }
        // For repeat reminders
        if (repeatOption.date) {
            data.repeat_by_days = data.repeat_by_days ? Math.max(1, data.repeat_by_days) : null; // Ensuring it's a positive number
        }
        if (repeatOption.km) {
            data.repeat_by_km = data.repeat_by_km ? Math.max(1, data.repeat_by_km) : null; // Ensuring it's a positive number
        }
        // Handling notify_before_days and notify_before_km
        data.notify_before_days = data.notify_before_days ? Math.max(1, data.notify_before_days) : null; // Ensure it's positive
        data.notify_before_km = data.notify_before_km ? Math.max(1, data.notify_before_km) : null; // Ensure it's positive
        // Convert to numbers where applicable
        data.start_odometer = data.start_odometer ? parseInt(data.start_odometer, 10) : null;
        data.next_due_km = data.next_due_km ? parseInt(data.next_due_km, 10) : null;
        data.repeat_by_days = data.repeat_by_days ? parseInt(data.repeat_by_days, 10) : null;
        data.repeat_by_km = data.repeat_by_km ? parseInt(data.repeat_by_km, 10) : null;
        data.notify_before_days = data.notify_before_days ? parseInt(data.notify_before_days, 10) : null;
        data.notify_before_km = data.notify_before_km ? parseInt(data.notify_before_km, 10) : null;
        if (data.start_date)
            data.start_date = new Date(data.start_date);
        if (data.due_date)
            data.due_date = new Date(data.due_date);
        onSubmit(data);
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(handleFormSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Description"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('description', { required: 'Description is required' }))),
            errors.description && typeof errors.description.message === "string" && (react_1.default.createElement("span", null, errors.description.message)),
            react_1.default.createElement("label", null, "License Plate"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('license_plate', { required: 'License plate is required' }))),
            errors.license_plate && typeof errors.license_plate.message === "string" && (react_1.default.createElement("span", null, errors.license_plate.message))),
        react_1.default.createElement("div", { className: "tabs" },
            react_1.default.createElement("button", { type: "button", onClick: () => setActiveTab("one-time") }, "Just One Time"),
            react_1.default.createElement("button", { type: "button", onClick: () => setActiveTab("repeat") }, "Repeat Every")),
        activeTab === "one-time" && (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "One-Time Options"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null,
                    react_1.default.createElement("input", { type: "radio", value: "date", checked: oneTimeOption === "date", onChange: () => setOneTimeOption("date") }),
                    "By Date"),
                react_1.default.createElement("label", null,
                    react_1.default.createElement("input", { type: "radio", value: "km", checked: oneTimeOption === "km", onChange: () => setOneTimeOption("km") }),
                    "By KM")),
            oneTimeOption === "date" && (react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Start Date"),
                react_1.default.createElement("input", Object.assign({ type: "date" }, register('start_date', { required: 'Start date is required' }))),
                errors.start_date && typeof errors.start_date.message === "string" && (react_1.default.createElement("span", null, errors.start_date.message)),
                react_1.default.createElement("label", null, "Due Date"),
                react_1.default.createElement("input", Object.assign({ type: "date" }, register('due_date', { required: 'Due date is required' }))),
                errors.due_date && typeof errors.due_date.message === "string" && (react_1.default.createElement("span", null, errors.due_date.message)),
                react_1.default.createElement("label", null, "Notify Before Days"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('notify_before_days'))))),
            oneTimeOption === "km" && (react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Start Odometer"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('start_odometer', { required: 'Start odometer is required' }))),
                errors.start_odometer && typeof errors.start_odometer.message === "string" && (react_1.default.createElement("span", null, errors.start_odometer.message)),
                react_1.default.createElement("label", null, "Next Due KM"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('next_due_km', { required: 'Next due km is required' }))),
                errors.next_due_km && typeof errors.next_due_km.message === "string" && (react_1.default.createElement("span", null, errors.next_due_km.message)),
                react_1.default.createElement("label", null, "Notify Before KM"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('notify_before_km'))))))),
        activeTab === "repeat" && (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Repeat Options"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null,
                    react_1.default.createElement("input", { type: "checkbox", checked: repeatOption.date, onChange: () => setRepeatOption(prev => (Object.assign(Object.assign({}, prev), { date: !prev.date }))) }),
                    "By Date"),
                react_1.default.createElement("label", null,
                    react_1.default.createElement("input", { type: "checkbox", checked: repeatOption.km, onChange: () => setRepeatOption(prev => (Object.assign(Object.assign({}, prev), { km: !prev.km }))) }),
                    "By KM")),
            repeatOption.date && (react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Start Date"),
                react_1.default.createElement("input", Object.assign({ type: "date" }, register('start_date', { required: 'Start date is required' }))),
                errors.start_date && typeof errors.start_date.message === "string" && (react_1.default.createElement("span", null, errors.start_date.message)),
                react_1.default.createElement("label", null, "Due Date"),
                react_1.default.createElement("input", Object.assign({ type: "date" }, register('due_date'))),
                react_1.default.createElement("label", null, "Repeat Every X Days"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('repeat_by_days'))),
                react_1.default.createElement("label", null, "Notify Before Days"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('notify_before_days'))))),
            repeatOption.km && (react_1.default.createElement("div", null,
                react_1.default.createElement("label", null, "Start Odometer"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('start_odometer', { required: 'Start odometer is required' }))),
                errors.start_odometer && typeof errors.start_odometer.message === "string" && (react_1.default.createElement("span", null, errors.start_odometer.message)),
                react_1.default.createElement("label", null, "Next Due KM"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('next_due_km'))),
                react_1.default.createElement("label", null, "Repeat Every X KM"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('repeat_by_km'))),
                react_1.default.createElement("label", null, "Notify Before KM"),
                react_1.default.createElement("input", Object.assign({ type: "number" }, register('notify_before_km'))))))),
        react_1.default.createElement("button", { type: "submit" }, "Save")));
};
exports.default = ReminderForm;
