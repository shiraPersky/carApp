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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const serviceApi_1 = require("../../services/serviceApi");
const OdometerForm = ({ licensePlate = '', onSubmitSuccess }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [formData, setFormData] = (0, react_1.useState)({
        licensePlate: licensePlate,
        odometer: ''
    });
    const [error, setError] = (0, react_1.useState)('');
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (licensePlate) {
            setFormData(prev => (Object.assign(Object.assign({}, prev), { licensePlate: licensePlate })));
        }
    }, [licensePlate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            // Convert odometer to number and ensure it's a valid number
            const odometerValue = Number(formData.odometer);
            if (isNaN(odometerValue)) {
                throw new Error('Invalid odometer value');
            }
            yield (0, serviceApi_1.updateOdometer)(formData.licensePlate, odometerValue);
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
            else {
                navigate('/cars');
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update odometer reading');
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { className: "block text-sm font-medium text-gray-700" }, "License Plate"),
            react_1.default.createElement("input", { type: "text", name: "licensePlate", value: formData.licensePlate, onChange: handleChange, required: true, disabled: !!licensePlate, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { className: "block text-sm font-medium text-gray-700" }, "Odometer Reading"),
            react_1.default.createElement("input", { type: "number", name: "odometer", value: formData.odometer, onChange: handleChange, required: true, min: "0", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" })),
        error && (react_1.default.createElement("div", { className: "text-red-500 text-sm" }, error)),
        react_1.default.createElement("div", { className: "flex justify-end space-x-3" },
            react_1.default.createElement("button", { type: "button", onClick: () => navigate('/cars'), className: "px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50", disabled: isSubmitting }, "Cancel"),
            react_1.default.createElement("button", { type: "submit", className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300", disabled: isSubmitting }, isSubmitting ? 'Updating...' : 'Update Odometer'))));
};
exports.default = OdometerForm;
