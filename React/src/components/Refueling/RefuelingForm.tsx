

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";

// const fuelTypes = [
//   "95 Octane (Regular Gasoline)",
//   "98 Octane (Premium Gasoline)",
//   "Electric",
//   "Hybrid",
//   "Diesel",
// ];

// const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: existingRefuel || {},
//   });

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("receipt", file);

//     try {
//       const response = await fetch("http://localhost:3000/api/refueling-scan/scan", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to process receipt");
//       }

//       const data = await response.json();
//       const originalValues = data.extractedData.originalValues;

//       // Convert date from MM/DD/YYYY to YYYY-MM-DD
//       if (originalValues.date) {
//         const [month, day, year] = originalValues.date.split('/');
//         const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//         setValue("date", formattedDate);
//       }

//       // Convert time from 12-hour to 24-hour format
//       if (originalValues.time) {
//         const [time, meridiem] = originalValues.time.split(' ');
//         let [hours, minutes] = time.split(':');
        
//         if (meridiem === 'PM' && hours !== '12') {
//           hours = (parseInt(hours) + 12).toString();
//         } else if (meridiem === 'AM' && hours === '12') {
//           hours = '00';
//         }
        
//         setValue("time", `${hours.padStart(2, '0')}:${minutes}`);
//       }

//       // Update other form fields from ILS data
//       setValue("pricePerLiter", parseFloat(data.extractedData.ils.pricePerLiter));
//       setValue("totalCost", parseFloat(data.extractedData.ils.totalCost));
//       setValue("liters", parseFloat(data.extractedData.ils.liters));

//       // Optional: Set additional fields if available
//       if (data.savedRecord?.gasStation) {
//         setValue("gasStation", data.savedRecord.gasStation);
//       }

//     } catch (error) {
//       alert("Failed to process receipt. Please try again or fill the form manually.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 600, margin: "0 auto" }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Refueling Form
//       </Typography>

//       <Box sx={{ mb: 2 }}>
//         <input
//           accept="image/*"
//           style={{ display: "none" }}
//           id="receipt-upload"
//           type="file"
//           onChange={handleImageUpload}
//         />
//         <label htmlFor="receipt-upload">
//           <Button variant="contained" component="span" fullWidth disabled={loading}>
//             {loading ? <CircularProgress size={24} /> : "Upload Receipt Image"}
//           </Button>
//         </label>
//       </Box>

//       {[ 
//         { label: "License Plate", name: "license_plate", type: "text" },
//         { label: "Date", name: "date", type: "date" },
//         { label: "Time", name: "time", type: "time" },
//         { label: "Odometer", name: "odometer", type: "number" },
//         { 
//           label: "Price per Liter", 
//           name: "pricePerLiter", 
//           type: "number", 
//           inputProps: { 
//             step: "0.01", 
//             min: "0" 
//           },
//           validate: (value) => !isNaN(value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || "Price per liter must be a valid number with up to 2 decimal places"
//         },
//         { 
//           label: "Total Cost", 
//           name: "totalCost", 
//           type: "number", 
//           inputProps: { 
//             step: "0.01", 
//             min: "0" 
//           },
//           validate: (value) => !isNaN(value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || "Total cost must be a valid number with up to 2 decimal places"
//         },
//         { 
//           label: "Liters", 
//           name: "liters", 
//           type: "number", 
//           inputProps: { 
//             step: "0.01", 
//             min: "0" 
//           },
//           validate: (value) => !isNaN(value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || "Liters must be a valid number with up to 2 decimal places"
//         },
//         { label: "Gas Station", name: "gasStation", type: "text" },
//         { label: "Driver", name: "driver", type: "text" },
//         { label: "Notes", name: "notes", multiline: true, rows: 3 },
//       ].map(({ label, name, validate, ...rest }) => (
//         <TextField
//           key={name}
//           label={label}
//           variant="outlined"
//           {...register(name, { 
//             required: `${label} is required`,
//             ...(validate ? { validate } : {}) 
//           })}
//           error={!!errors[name]}
//           helperText={errors[name]?.message?.toString()}
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           {...rest}
//         />
//       ))}

//       <FormControl fullWidth error={!!errors.kindOfFuel}>
//         <InputLabel>Kind of Fuel</InputLabel>
//         <Select
//           {...register("kindOfFuel", { required: "Kind of fuel is required" })}
//           defaultValue=""
//         >
//           <MenuItem value="">Select a fuel type</MenuItem>
//           {fuelTypes.map((fuel, index) => (
//             <MenuItem key={index} value={fuel}>
//               {fuel}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button type="submit" variant="contained" color="primary">
//         Save
//       </Button>
//     </Box>
//   );
// };

// export default RefuelingForm;






// import React, { useState } from "react";
// import { useForm, FieldError } from "react-hook-form";
// import "../../styles/RefuelingForm.css";

// // Define TypeScript interfaces
// interface RefuelingFormData {
//   license_plate: string;
//   date: string;
//   time: string;
//   odometer: number;
//   kindOfFuel: string;
//   pricePerLiter: number;
//   totalCost: number;
//   liters: number;
//   gasStation: string;
//   driver: string;
//   notes?: string;
// }

// interface RefuelingFormProps {
//   existingRefuel?: Partial<RefuelingFormData>;
//   onSubmit?: (data: RefuelingFormData) => void;
// }

// const fuelTypes = [
//   "95 Octane (Regular Gasoline)",
//   "98 Octane (Premium Gasoline)",
//   "Electric",
//   "Hybrid",
//   "Diesel",
// ];

// const RefuelingForm: React.FC<RefuelingFormProps> = ({ existingRefuel, onSubmit }) => {
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<RefuelingFormData>({
//     defaultValues: existingRefuel || {},
//   });

//   // Helper function to safely convert error message to string
//   const getErrorMessage = (error: FieldError | undefined): string => {
//     return error?.message?.toString() || "";
//   };

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("receipt", file);

//     try {
//       const response = await fetch("http://localhost:3000/api/refueling-scan/scan", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to process receipt");
//       }

//       const data = await response.json();
//       const originalValues = data.extractedData.originalValues;

//       // Convert date from MM/DD/YYYY to YYYY-MM-DD
//       if (originalValues.date) {
//         const [month, day, year] = originalValues.date.split('/');
//         const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//         setValue("date", formattedDate);
//       }

//       // Convert time from 12-hour to 24-hour format
//       if (originalValues.time) {
//         const [time, meridiem] = originalValues.time.split(' ');
//         let [hours, minutes] = time.split(':');
        
//         if (meridiem === 'PM' && hours !== '12') {
//           hours = (parseInt(hours) + 12).toString();
//         } else if (meridiem === 'AM' && hours === '12') {
//           hours = '00';
//         }
        
//         setValue("time", `${hours.padStart(2, '0')}:${minutes}`);
//       }

//       // Update other form fields from ILS data
//       setValue("pricePerLiter", parseFloat(data.extractedData.ils.pricePerLiter));
//       setValue("totalCost", parseFloat(data.extractedData.ils.totalCost));
//       setValue("liters", parseFloat(data.extractedData.ils.liters));

//       // Optional: Set additional fields if available
//       if (data.savedRecord?.gasStation) {
//         setValue("gasStation", data.savedRecord.gasStation);
//       }

//     } catch (error) {
//       alert("Failed to process receipt. Please try again or fill the form manually.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processForm = (data: RefuelingFormData) => {
//     if (onSubmit) {
//       onSubmit(data);
//     }
//   };

//   return (
//     <div className="refueling-form-container">
//       <div className="form-section">
//         <h3>Refueling Details</h3>
        
//         <div className="input-row">
//           <div className="input-field full-width">
//             <label>License Plate</label>
//             <input
//               type="text"
//               {...register("license_plate", { required: "License Plate is required" })}
//             />
//             {errors.license_plate && <span className="error">{getErrorMessage(errors.license_plate)}</span>}
//           </div>
//         </div>
        
//         <div className="input-row">
//           <div className="input-field">
//             <label>Date</label>
//             <input
//               type="date"
//               {...register("date", { required: "Date is required" })}
//             />
//             {errors.date && <span className="error">{getErrorMessage(errors.date)}</span>}
//           </div>
//           <div className="input-field">
//             <label>Time</label>
//             <input
//               type="time"
//               {...register("time", { required: "Time is required" })}
//             />
//             {errors.time && <span className="error">{getErrorMessage(errors.time)}</span>}
//           </div>
//         </div>
        
//         <div className="input-row">
//           <div className="input-field">
//             <label>Odometer</label>
//             <input
//               type="number"
//               {...register("odometer", { required: "Odometer is required" })}
//             />
//             {errors.odometer && <span className="error">{getErrorMessage(errors.odometer)}</span>}
//           </div>
//           <div className="input-field">
//             <label>Kind of Fuel</label>
//             <select
//               {...register("kindOfFuel", { required: "Kind of fuel is required" })}
//               defaultValue=""
//             >
//               <option value="">Select a fuel type</option>
//               {fuelTypes.map((fuel, index) => (
//                 <option key={index} value={fuel}>
//                   {fuel}
//                 </option>
//               ))}
//             </select>
//             {errors.kindOfFuel && <span className="error">{getErrorMessage(errors.kindOfFuel)}</span>}
//           </div>
//         </div>
        
//         <div className="input-row">
//           <div className="input-field">
//             <label>Price per Liter</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               {...register("pricePerLiter", { 
//                 required: "Price per liter is required",
//                 validate: (value) => !isNaN(Number(value)) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Price per liter must be a valid number with up to 2 decimal places"
//               })}
//             />
//             {errors.pricePerLiter && <span className="error">{getErrorMessage(errors.pricePerLiter)}</span>}
//           </div>
//           <div className="input-field">
//             <label>Total Cost</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               {...register("totalCost", { 
//                 required: "Total cost is required",
//                 validate: (value) => !isNaN(Number(value)) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Total cost must be a valid number with up to 2 decimal places"
//               })}
//             />
//             {errors.totalCost && <span className="error">{getErrorMessage(errors.totalCost)}</span>}
//           </div>
//         </div>
        
//         <div className="input-row">
//           <div className="input-field">
//             <label>Liters</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               {...register("liters", { 
//                 required: "Liters is required",
//                 validate: (value) => !isNaN(Number(value)) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Liters must be a valid number with up to 2 decimal places"
//               })}
//             />
//             {errors.liters && <span className="error">{getErrorMessage(errors.liters)}</span>}
//           </div>
//           <div className="input-field">
//             <label>Gas Station</label>
//             <input
//               type="text"
//               {...register("gasStation", { required: "Gas Station is required" })}
//             />
//             {errors.gasStation && <span className="error">{getErrorMessage(errors.gasStation)}</span>}
//           </div>
//         </div>
        
//         <div className="input-row">
//           <div className="input-field">
//             <label>Driver</label>
//             <input
//               type="text"
//               {...register("driver", { required: "Driver is required" })}
//             />
//             {errors.driver && <span className="error">{getErrorMessage(errors.driver)}</span>}
//           </div>
//           <div className="input-field">
//             <label>Receipt Upload</label>
//             <div className="upload-container">
//               <input
//                 id="receipt-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//               <label htmlFor="receipt-upload" className="upload-button">
//                 {loading ? "Processing..." : "Upload Receipt"}
//               </label>
//             </div>
//           </div>
//         </div>
        
//         <div className="input-row">
//           <div className="input-field full-width">
//             <label>Notes</label>
//             <textarea
//               rows={3}
//               {...register("notes")}
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className="button-row">
//         <button type="button" className="cancel-button">Cancel</button>
//         <button 
//           type="button" 
//           className="save-button"
//           onClick={handleSubmit(processForm)}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RefuelingForm;


import React, { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import "../../styles/RefuelingForm.css";

// Define TypeScript interfaces
interface RefuelingFormData {
  license_plate: string;
  date: string;
  time: string;
  odometer: number;
  kindOfFuel: string;
  pricePerLiter: number;
  totalCost: number;
  liters: number;
  gasStation: string;
  driver: string;
  notes?: string;
}

interface RefuelingFormProps {
  existingRefuel?: Partial<RefuelingFormData>;
  onSubmit?: (data: RefuelingFormData) => void;
  onCancel?: () => void; // Add this line
}

const fuelTypes = [
  "95 Octane (Regular Gasoline)",
  "98 Octane (Premium Gasoline)",
  "Electric",
  "Hybrid",
  "Diesel",
];

const RefuelingForm: React.FC<RefuelingFormProps> = ({ 
  existingRefuel, 
  onSubmit,
  onCancel  // Add this parameter
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RefuelingFormData>({
    defaultValues: existingRefuel || {},
  });

  // Helper function to safely convert error message to string
  const getErrorMessage = (error: FieldError | undefined): string => {
    return error?.message?.toString() || "";
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("receipt", file);

    try {
      const response = await fetch("http://localhost:3000/api/refueling-scan/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process receipt");
      }

      const data = await response.json();
      const originalValues = data.extractedData.originalValues;

      // Convert date from MM/DD/YYYY to YYYY-MM-DD
      if (originalValues.date) {
        const [month, day, year] = originalValues.date.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        setValue("date", formattedDate);
      }

      // Convert time from 12-hour to 24-hour format
      if (originalValues.time) {
        const [time, meridiem] = originalValues.time.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (meridiem === 'PM' && hours !== '12') {
          hours = (parseInt(hours) + 12).toString();
        } else if (meridiem === 'AM' && hours === '12') {
          hours = '00';
        }
        
        setValue("time", `${hours.padStart(2, '0')}:${minutes}`);
      }

      // Update other form fields from ILS data
      setValue("pricePerLiter", parseFloat(data.extractedData.ils.pricePerLiter));
      setValue("totalCost", parseFloat(data.extractedData.ils.totalCost));
      setValue("liters", parseFloat(data.extractedData.ils.liters));

      // Optional: Set additional fields if available
      if (data.savedRecord?.gasStation) {
        setValue("gasStation", data.savedRecord.gasStation);
      }

    } catch (error) {
      alert("Failed to process receipt. Please try again or fill the form manually.");
    } finally {
      setLoading(false);
    }
  };

  const processForm = (data: RefuelingFormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  // Handler for cancel button
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="refueling-form-container">
      <div className="form-section">
        <h3>Refueling Details</h3>
        
        <div className="input-row">
          <div className="input-field full-width">
            <label>License Plate</label>
            <input
              type="text"
              {...register("license_plate", { required: "License Plate is required" })}
            />
            {errors.license_plate && <span className="error">{getErrorMessage(errors.license_plate)}</span>}
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-field">
            <label>Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && <span className="error">{getErrorMessage(errors.date)}</span>}
          </div>
          <div className="input-field">
            <label>Time</label>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
            />
            {errors.time && <span className="error">{getErrorMessage(errors.time)}</span>}
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-field">
            <label>Odometer</label>
            <input
              type="number"
              {...register("odometer", { required: "Odometer is required" })}
            />
            {errors.odometer && <span className="error">{getErrorMessage(errors.odometer)}</span>}
          </div>
          <div className="input-field">
            <label>Kind of Fuel</label>
            <select
              {...register("kindOfFuel", { required: "Kind of fuel is required" })}
              defaultValue=""
            >
              <option value="">Select a fuel type</option>
              {fuelTypes.map((fuel, index) => (
                <option key={index} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
            {errors.kindOfFuel && <span className="error">{getErrorMessage(errors.kindOfFuel)}</span>}
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-field">
            <label>Price per Liter</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("pricePerLiter", { 
                required: "Price per liter is required",
                validate: (value) => !isNaN(Number(value)) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Price per liter must be a valid number with up to 2 decimal places"
              })}
            />
            {errors.pricePerLiter && <span className="error">{getErrorMessage(errors.pricePerLiter)}</span>}
          </div>
          <div className="input-field">
            <label>Total Cost</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("totalCost", { 
                required: "Total cost is required",
                validate: (value) => !isNaN(Number(value)) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Total cost must be a valid number with up to 2 decimal places"
              })}
            />
            {errors.totalCost && <span className="error">{getErrorMessage(errors.totalCost)}</span>}
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-field">
            <label>Liters</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("liters", { 
                required: "Liters is required",
                validate: (value) => !isNaN(Number(value)) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Liters must be a valid number with up to 2 decimal places"
              })}
            />
            {errors.liters && <span className="error">{getErrorMessage(errors.liters)}</span>}
          </div>
          <div className="input-field">
            <label>Gas Station</label>
            <input
              type="text"
              {...register("gasStation", { required: "Gas Station is required" })}
            />
            {errors.gasStation && <span className="error">{getErrorMessage(errors.gasStation)}</span>}
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-field">
            <label>Driver</label>
            <input
              type="text"
              {...register("driver", { required: "Driver is required" })}
            />
            {errors.driver && <span className="error">{getErrorMessage(errors.driver)}</span>}
          </div>
          <div className="input-field">
            <label>Receipt Upload</label>
            <div className="upload-container">
              <input
                id="receipt-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="receipt-upload" className="upload-button">
                {loading ? "Processing..." : "Upload Receipt"}
              </label>
            </div>
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-field full-width">
            <label>Notes</label>
            <textarea
              rows={3}
              {...register("notes")}
            />
          </div>
        </div>
      </div>
      
      <div className="button-row">
        <button 
          type="button" 
          className="cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          type="button" 
          className="save-button"
          onClick={handleSubmit(processForm)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RefuelingForm;