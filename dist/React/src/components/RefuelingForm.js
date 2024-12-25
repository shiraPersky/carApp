"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importDefault(require("react"));
const fuelTypes = [
    "95 Octane (Regular Gasoline)", "98 Octane (Premium Gasoline)", "Electric", "Hybrid", "Diesel "
];
const RefuelingForm = ({ existingRefuel, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({
        defaultValues: existingRefuel || {},
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
            react_1.default.createElement("label", null, "Kind of Fuel"),
            react_1.default.createElement("select", Object.assign({}, register('kindOfFuel', { required: 'Kind of fuel is required' })),
                react_1.default.createElement("option", { value: "" }, "Select a fuel type"),
                fuelTypes.map((fuel, index) => (react_1.default.createElement("option", { key: index, value: fuel }, fuel)))),
            errors.kindOfFuel && react_1.default.createElement("span", null, errors.kindOfFuel.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Price per Liter"),
            react_1.default.createElement("input", Object.assign({ type: "number", step: "0.01" }, register('pricePerLiter', { required: 'Price per liter is required' }))),
            errors.pricePerLiter && react_1.default.createElement("span", null, errors.pricePerLiter.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Total Cost"),
            react_1.default.createElement("input", Object.assign({ type: "number", step: "0.01" }, register('totalCost', { required: 'Total cost is required' }))),
            errors.totalCost && react_1.default.createElement("span", null, errors.totalCost.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Liters"),
            react_1.default.createElement("input", Object.assign({ type: "number", step: "0.01" }, register('liters', { required: 'Liters is required' }))),
            errors.liters && react_1.default.createElement("span", null, errors.liters.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Gas Station"),
            react_1.default.createElement("input", Object.assign({}, register('gasStation')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Driver"),
            react_1.default.createElement("input", Object.assign({}, register('driver')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Notes"),
            react_1.default.createElement("textarea", Object.assign({}, register('notes')))),
        react_1.default.createElement("button", { type: "submit" }, "Save")));
};
exports.default = RefuelingForm;
