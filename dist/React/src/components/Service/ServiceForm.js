"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importDefault(require("react"));
const serviceTypes = [
    "Air conditioning", "Air filter", "Battery", "Belts", "Brake fluid", "Brake pad",
    "Car wash", "Fuel filter", "Inspection", "Labor cost", "Lights", "New tires",
    "Oil change", "Oil filter", "Rotate tires", "Suspension system", "Tire pressure",
    "Wheel alignment", "Engine oil", "Spark plugs", "Change Tires", "Coolant",
    "Turn signals", "Parking lights", "Windshields wipers"
];
const ServiceForm = ({ existingService, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({
        defaultValues: existingService || {},
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Car ID"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('car_id', { required: 'Car ID is required' }))),
            errors.car_id && react_1.default.createElement("span", null, errors.car_id.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "License Plate"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('license_plate', { required: 'License plate is required' })))),
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
            react_1.default.createElement("select", Object.assign({}, register('service_type', { required: 'Service type is required' })),
                react_1.default.createElement("option", { value: "" }, "Select a service"),
                serviceTypes.map((service, index) => (react_1.default.createElement("option", { key: index, value: service }, service)))),
            errors.service_type && react_1.default.createElement("span", null, errors.service_type.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Place"),
            react_1.default.createElement("input", Object.assign({}, register('place')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Driver"),
            react_1.default.createElement("input", Object.assign({}, register('driver')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Payment Method"),
            react_1.default.createElement("input", Object.assign({}, register('paymentMethod', { required: 'Payment method is required' }))),
            errors.paymentMethod && react_1.default.createElement("span", null, errors.paymentMethod.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Cost"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('cost', { required: 'Cost is required' })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Notes"),
            react_1.default.createElement("textarea", Object.assign({}, register('notes')))),
        react_1.default.createElement("button", { type: "submit" }, "Save")));
};
exports.default = ServiceForm;
