"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importDefault(require("react"));
const ServiceForm = ({ existingService, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({
        defaultValues: existingService || {},
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Date"),
            react_1.default.createElement("input", Object.assign({ type: "date" }, register('date', { required: 'Date is required' })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Time"),
            react_1.default.createElement("input", Object.assign({ type: "time" }, register('time', { required: 'Time is required' })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Odometer"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('odometer', { required: 'Odometer is required' })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Service Type"),
            react_1.default.createElement("input", Object.assign({}, register('service_type', { required: 'Service type is required' })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Place"),
            react_1.default.createElement("input", Object.assign({}, register('place')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Driver"),
            react_1.default.createElement("input", Object.assign({}, register('driver')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Payment Method"),
            react_1.default.createElement("input", Object.assign({}, register('payment_method')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Cost"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('cost', { required: 'Cost is required' })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Notes"),
            react_1.default.createElement("textarea", Object.assign({}, register('notes')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Reminder"),
            react_1.default.createElement("input", Object.assign({}, register('reminder')))),
        react_1.default.createElement("button", { type: "submit" }, "Save")));
};
exports.default = ServiceForm;
