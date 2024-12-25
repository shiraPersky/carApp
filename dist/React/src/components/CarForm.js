"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importDefault(require("react"));
const CarForm = ({ existingCar, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)({
        defaultValues: existingCar || {},
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "License Plate"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('license_plate', { required: 'License plate is required' }))),
            errors.license_plate && react_1.default.createElement("span", null, errors.license_plate.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Make"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('make', { required: 'Make is required' }))),
            errors.make && react_1.default.createElement("span", null, errors.make.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Model"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('model', { required: 'Model is required' }))),
            errors.model && react_1.default.createElement("span", null, errors.model.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Year"),
            react_1.default.createElement("input", Object.assign({ type: "number" }, register('year', { required: 'Year is required' }))),
            errors.year && react_1.default.createElement("span", null, errors.year.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Color"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('color', { required: 'Color is required' }))),
            errors.color && react_1.default.createElement("span", null, errors.color.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Emission Group"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('emission_group')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Valid Until"),
            react_1.default.createElement("input", Object.assign({ type: "date" }, register('valid_until', { required: 'Validity date is required' }))),
            errors.valid_until && react_1.default.createElement("span", null, errors.valid_until.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Trim Level"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('trim_level')))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Last Test"),
            react_1.default.createElement("input", Object.assign({ type: "date" }, register('last_test', { required: 'Last test date is required' }))),
            errors.last_test && react_1.default.createElement("span", null, errors.last_test.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Model Type"),
            react_1.default.createElement("select", Object.assign({}, register('model_type', { required: 'Model type is required' })),
                react_1.default.createElement("option", { value: "" }, "Select Model Type"),
                react_1.default.createElement("option", { value: "private" }, "Private"),
                react_1.default.createElement("option", { value: "commercial" }, "Commercial")),
            errors.model_type && react_1.default.createElement("span", null, errors.model_type.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Model Number"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('model_number', { required: 'Model number is required' }))),
            errors.model_number && react_1.default.createElement("span", null, errors.model_number.message)),
        react_1.default.createElement("button", { type: "submit" }, "Save")));
};
exports.default = CarForm;
