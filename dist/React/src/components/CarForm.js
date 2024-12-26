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
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importStar(require("react"));
const CarForm = ({ existingCar, onSubmit }) => {
    const [autoFill, setAutoFill] = (0, react_1.useState)(false); // Track whether to autofill
    const { register, handleSubmit, formState: { errors }, setValue } = (0, react_hook_form_1.useForm)({
        defaultValues: existingCar || {},
    });
    const handleAutoFill = () => {
        if (existingCar) {
            // Auto-fill the form with existing car data
            Object.entries(existingCar).forEach(([key, value]) => {
                setValue(key, value); // Set each field's value
            });
        }
    };
    const handleAutoFillChange = (e) => {
        const isChecked = e.target.checked;
        setAutoFill(isChecked);
        if (isChecked) {
            handleAutoFill(); // Call autofill when the checkbox is checked
        }
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null,
                react_1.default.createElement("input", { type: "checkbox", checked: autoFill, onChange: handleAutoFillChange }),
                "Auto-fill with Existing Car Data")),
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
