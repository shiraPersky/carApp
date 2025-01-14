"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importDefault(require("react"));
const ReminderForm = ({ existingReminder, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({
        defaultValues: existingReminder || {},
    });
    const handleFormSubmit = (data) => {
        // Ensure values are integers before submitting
        data.start_odometer = parseInt(data.start_odometer, 10);
        data.next_due_km = parseInt(data.next_due_km, 10);
        data.repeat_by_days = parseInt(data.repeat_by_days, 10);
        data.repeat_by_km = parseInt(data.repeat_by_km, 10);
        data.notify_before_days = parseInt(data.notify_before_days, 10);
        data.notify_before_km = parseInt(data.notify_before_km, 10);
        // Submit the data to the parent onSubmit function
        onSubmit(data);
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(handleFormSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "License Plate"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('license_plate', { required: 'License plate is required' }))),
            errors.license_plate && react_1.default.createElement("span", null, errors.license_plate.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Description"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('description', { required: 'Description is required' }))),
            errors.description && react_1.default.createElement("span", null, errors.description.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Start Date"),
            react_1.default.createElement("input", Object.assign({ type: "date" }, register('start_date', { required: 'Start date is required' }))),
            errors.start_date && react_1.default.createElement("span", null, errors.start_date.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Start Odometer"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('start_odometer', { required: 'Start odometer is required' }))),
            errors.start_odometer && react_1.default.createElement("span", null, errors.start_odometer.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Due Date"),
            react_1.default.createElement("input", Object.assign({ type: "date" }, register('due_date', { required: 'Due date is required' }))),
            errors.due_date && react_1.default.createElement("span", null, errors.due_date.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Next Due KM"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('next_due_km', { required: 'Next due KM is required' }))),
            errors.next_due_km && react_1.default.createElement("span", null, errors.next_due_km.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Repeat by Days"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('repeat_by_days')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Repeat by KM"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('repeat_by_km')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Notify Before Days"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('notify_before_days')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Notify Before KM"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('notify_before_km')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Completed"),
            react_1.default.createElement("input", Object.assign({ type: "checkbox" }, register('completed')))),
        react_1.default.createElement("button", { type: "submit" }, "Save")));
};
exports.default = ReminderForm;
