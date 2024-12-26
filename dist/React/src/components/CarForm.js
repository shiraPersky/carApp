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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const CarForm = ({ existingCar, onSubmit }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false); // Loading state for auto-fill
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = (0, react_hook_form_1.useForm)({
        defaultValues: existingCar || {},
    });
    const handleAutoFillFromLicensePlate = () => __awaiter(void 0, void 0, void 0, function* () {
        const licensePlate = getValues('license_plate');
        if (!licensePlate) {
            alert('Please enter a license plate to auto-fill the form.');
            return;
        }
        try {
            setIsLoading(true);
            // Use the CarDetails type for the response
            const response = yield axios_1.default.get(`http://localhost:3000/csv/search/${licensePlate}`);
            const carDetails = response.data.car; // Type is now inferred correctly
            if (carDetails) {
                // Set each field's value in the form
                setValue('make', carDetails.make);
                setValue('model', carDetails.model);
                setValue('year', carDetails.year);
                setValue('color', carDetails.color);
                setValue('emission_group', carDetails.emission_group);
                setValue('valid_until', carDetails.valid_until.split('T')[0]); // Convert to YYYY-MM-DD
                setValue('trim_level', carDetails.trim_level);
                setValue('last_test', carDetails.last_test.split('T')[0]); // Convert to YYYY-MM-DD
                setValue('model_type', carDetails.model_type);
                setValue('model_number', carDetails.model_number);
            }
            else {
                alert('No car details found for this license plate.');
            }
        }
        catch (error) {
            console.error('Error fetching car details:', error);
            alert('Failed to auto-fill the form. Please check the license plate.');
        }
        finally {
            setIsLoading(false);
        }
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "License Plate"),
            react_1.default.createElement("input", Object.assign({ type: "text" }, register('license_plate', { required: 'License plate is required' }))),
            errors.license_plate && react_1.default.createElement("span", null, errors.license_plate.message)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { type: "button", onClick: handleAutoFillFromLicensePlate, disabled: isLoading }, isLoading ? 'Loading...' : 'Auto Fill from License Plate')),
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
// import { useForm } from 'react-hook-form';
// import React, { useState } from 'react';
// import axios from 'axios';
// // Define the expected structure of the car details response
// type CarDetails = {
//   make: string;
//   model: string;
//   year: string;
//   color: string;
//   emission_group: string;
//   valid_until: string;
//   trim_level: string;
//   last_test: string;
//   model_type: string;
//   model_number: string;
// };
// const CarForm = ({ existingCar, onSubmit }: any) => {
//   const [autoFill, setAutoFill] = useState(false); // Track whether to autofill
//   const [isLoading, setIsLoading] = useState(false); // Loading state for auto-fill
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
//     defaultValues: existingCar || {},
//   });
//   const handleAutoFillFromLicensePlate = async () => {
//     const licensePlate = getValues('license_plate');
//     if (!licensePlate) {
//       alert('Please enter a license plate to auto-fill the form.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       // Use the CarDetails type for the response
//       const response = await axios.get<{ car: CarDetails }>(`http://localhost:3000/csv/search/${licensePlate}`);
//       const carDetails = response.data.car; // Type is now inferred correctly
//       if (carDetails) {
//         // Set each field's value in the form
//         setValue('make', carDetails.make);
//         setValue('model', carDetails.model);
//         setValue('year', carDetails.year);
//         setValue('color', carDetails.color);
//         setValue('emission_group', carDetails.emission_group);
//         setValue('valid_until', carDetails.valid_until.split('T')[0]); // Convert to YYYY-MM-DD
//         setValue('trim_level', carDetails.trim_level);
//         setValue('last_test', carDetails.last_test.split('T')[0]); // Convert to YYYY-MM-DD
//         setValue('model_type', carDetails.model_type);
//         setValue('model_number', carDetails.model_number);
//       } else {
//         alert('No car details found for this license plate.');
//       }
//     } catch (error) {
//       console.error('Error fetching car details:', error);
//       alert('Failed to auto-fill the form. Please check the license plate.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleAutoFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const isChecked = e.target.checked;
//     setAutoFill(isChecked);
//     if (isChecked && existingCar) {
//       // Auto-fill with existing car data when the checkbox is checked
//       Object.entries(existingCar).forEach(([key, value]) => {
//         setValue(key, value); // Set each field's value
//       });
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Auto-Fill Checkbox */}
//       <div>
//         <label>
//           <input 
//             type="checkbox" 
//             checked={autoFill} 
//             onChange={handleAutoFillChange} 
//           />
//           Auto-fill with Existing Car Data
//         </label>
//       </div>
//       {/* License Plate */}
//       <div>
//         <label>License Plate</label>
//         <input 
//           type="text" 
//           {...register('license_plate', { required: 'License plate is required' })} 
//         />
//         {errors.license_plate && <span>{(errors.license_plate as any).message}</span>}
//       </div>
//       {/* Auto-Fill Button */}
//       <div>
//         <button 
//           type="button" 
//           onClick={handleAutoFillFromLicensePlate} 
//           disabled={isLoading}
//         >
//           {isLoading ? 'Loading...' : 'Auto Fill from License Plate'}
//         </button>
//       </div>
//       {/* Other Fields */}
//       <div>
//         <label>Make</label>
//         <input 
//           type="text" 
//           {...register('make', { required: 'Make is required' })} 
//         />
//         {errors.make && <span>{(errors.make as any).message}</span>}
//       </div>
//       <div>
//         <label>Model</label>
//         <input 
//           type="text" 
//           {...register('model', { required: 'Model is required' })} 
//         />
//         {errors.model && <span>{(errors.model as any).message}</span>}
//       </div>
//       <div>
//         <label>Year</label>
//         <input 
//           type="number" 
//           {...register('year', { required: 'Year is required' })} 
//         />
//         {errors.year && <span>{(errors.year as any).message}</span>}
//       </div>
//       <div>
//         <label>Color</label>
//         <input 
//           type="text" 
//           {...register('color', { required: 'Color is required' })} 
//         />
//         {errors.color && <span>{(errors.color as any).message}</span>}
//       </div>
//       <div>
//         <label>Emission Group</label>
//         <input 
//           type="text" 
//           {...register('emission_group')} 
//         />
//       </div>
//       <div>
//         <label>Valid Until</label>
//         <input 
//           type="date" 
//           {...register('valid_until', { required: 'Validity date is required' })} 
//         />
//         {errors.valid_until && <span>{(errors.valid_until as any).message}</span>}
//       </div>
//       <div>
//         <label>Trim Level</label>
//         <input 
//           type="text" 
//           {...register('trim_level')} 
//         />
//       </div>
//       <div>
//         <label>Last Test</label>
//         <input 
//           type="date" 
//           {...register('last_test', { required: 'Last test date is required' })} 
//         />
//         {errors.last_test && <span>{(errors.last_test as any).message}</span>}
//       </div>
//       <div>
//         <label>Model Type</label>
//         <select {...register('model_type', { required: 'Model type is required' })}>
//           <option value="">Select Model Type</option>
//           <option value="private">Private</option>
//           <option value="commercial">Commercial</option>
//         </select>
//         {errors.model_type && <span>{(errors.model_type as any).message}</span>}
//       </div>
//       <div>
//         <label>Model Number</label>
//         <input 
//           type="text" 
//           {...register('model_number', { required: 'Model number is required' })} 
//         />
//         {errors.model_number && <span>{(errors.model_number as any).message}</span>}
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };
// export default CarForm;
