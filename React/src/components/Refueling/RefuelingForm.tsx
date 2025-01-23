// import { useForm } from 'react-hook-form';
// import React from 'react';

// const fuelTypes = [
//   "95 Octane (Regular Gasoline)", "98 Octane (Premium Gasoline)", "Electric", "Hybrid", "Diesel "
// ];

// const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: existingRefuel || {},
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Car ID */}
//        {/* License Plate */}
//        <div>
//         <label>License Plate</label>
//         <input 
//           type="text" 
//           {...register('license_plate', { required: 'License plate is required' })} 
//         />
//       </div>
//       <div>
//         <label>Date</label>
//         <input type="date" {...register('date', { required: 'Date is required' })} />
//       </div>
//       <div>
//         <label>Time</label>
//         <input type="time" {...register('time', { required: 'Time is required' })} />
//       </div>
//       <div>
//         <label>Odometer</label>
//         <input type="number" {...register('odometer', { required: 'Odometer is required' })} />
//       </div>
//       <div>
//         <label>Kind of Fuel</label>
//         <select {...register('kindOfFuel', { required: 'Kind of fuel is required' })}>
//           <option value="">Select a fuel type</option>
//           {fuelTypes.map((fuel, index) => (
//             <option key={index} value={fuel}>
//               {fuel}
//             </option>
//           ))}
//         </select>
//         {errors.kindOfFuel && <span>{(errors.kindOfFuel as any).message}</span>} 
//       </div>
//       <div>
//         <label>Price per Liter</label>
//         <input 
//           type="number" 
//           step="0.01" 
//           {...register('pricePerLiter', { required: 'Price per liter is required' })} 
//         />
//         {errors.pricePerLiter && <span>{(errors.pricePerLiter as any).message}</span>}
//       </div>
//       <div>
//         <label>Total Cost</label>
//         <input 
//           type="number" 
//           step="0.01" 
//           {...register('totalCost', { required: 'Total cost is required' })} 
//         />
//         {errors.totalCost && <span>{(errors.totalCost as any).message}</span>}
//       </div>
//       <div>
//         <label>Liters</label>
//         <input 
//           type="number" 
//           step="0.01" 
//           {...register('liters', { required: 'Liters is required' })} 
//         />
//         {errors.liters && <span>{(errors.liters as any).message}</span>}
//       </div>
//       <div>
//         <label>Gas Station</label>
//         <input {...register('gasStation')} />
//       </div>
//       <div>
//         <label>Driver</label>
//         <input {...register('driver')} />
//       </div>
//       <div>
//         <label>Notes</label>
//         <textarea {...register('notes')} />
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default RefuelingForm;

//work before scanreciept
// import React from "react";
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
// } from "@mui/material";

// const fuelTypes = [
//   "95 Octane (Regular Gasoline)",
//   "98 Octane (Premium Gasoline)",
//   "Electric",
//   "Hybrid",
//   "Diesel",
// ];

// const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: existingRefuel || {},
//   });

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 600, margin: "0 auto" }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Refueling Form
//       </Typography>

//       {/* License Plate */}
//       <TextField
//         label="License Plate"
//         variant="outlined"
//         {...register("license_plate", { required: "License plate is required" })}
//         error={!!errors.license_plate}
//         helperText={errors.license_plate?.message?.toString()} 
//         fullWidth
//       />

//       {/* Date */}
//       <TextField
//         label="Date"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register("date", { required: "Date is required" })}
//         error={!!errors.date}
//         helperText={errors.date?.message?.toString()} 
//         fullWidth
//       />

//       {/* Time */}
//       <TextField
//         label="Time"
//         type="time"
//         InputLabelProps={{ shrink: true }}
//         {...register("time", { required: "Time is required" })}
//         error={!!errors.time}
//         helperText={errors.time?.message?.toString()} 
//         fullWidth
//       />

//       {/* Odometer */}
//       <TextField
//         label="Odometer"
//         type="number"
//         {...register("odometer", { required: "Odometer is required" })}
//         error={!!errors.odometer}
//         helperText={errors.odometer?.message?.toString()} 
//         fullWidth
//       />

//       {/* Kind of Fuel */}
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
//         {errors.kindOfFuel && (
//           <Typography variant="caption" color="error">
//             {errors.kindOfFuel.message?.toString()}
//           </Typography>
//         )}
//       </FormControl>

//       {/* Price per Liter */}
//       <TextField
//         label="Price per Liter"
//         type="number"
//         inputProps={{ step: "0.01" }}
//         {...register("pricePerLiter", { required: "Price per liter is required" })}
//         error={!!errors.pricePerLiter}
//         helperText={errors.pricePerLiter?.message?.toString()}
//         fullWidth
//       />

//       {/* Total Cost */}
//       <TextField
//         label="Total Cost"
//         type="number"
//         inputProps={{ step: "0.01" }}
//         {...register("totalCost", { required: "Total cost is required" })}
//         error={!!errors.totalCost}
//         helperText={errors.totalCost?.message?.toString()} 
//         fullWidth
//       />

//       {/* Liters */}
//       <TextField
//         label="Liters"
//         type="number"
//         inputProps={{ step: "0.01" }}
//         {...register("liters", { required: "Liters is required" })}
//         error={!!errors.liters}
//         helperText={errors.liters?.message?.toString()}
//         fullWidth
//       />

//       {/* Gas Station */}
//       <TextField
//         label="Gas Station"
//         variant="outlined"
//         {...register("gasStation")}
//         fullWidth
//       />

//       {/* Driver */}
//       <TextField
//         label="Driver"
//         variant="outlined"
//         {...register("driver")}
//         fullWidth
//       />

//       {/* Notes */}
//       <TextField
//         label="Notes"
//         variant="outlined"
//         multiline
//         rows={3}
//         {...register("notes")}
//         fullWidth
//       />

//       {/* Submit Button */}
//       <Button type="submit" variant="contained" color="primary">
//         Save
//       </Button>
//     </Box>
//   );
// };

// export default RefuelingForm;

//all work except when fiiling automatically the name of the field remain
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//     TextField,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel,
//     Button,
//     Typography,
//     Box,
//     CircularProgress,
//   } from "@mui/material";
  

// const fuelTypes = [
//   "95 Octane (Regular Gasoline)",
//   "98 Octane (Premium Gasoline)",
//   "Electric",
//   "Hybrid",
//   "Diesel",
// ];

// // const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues: existingRefuel || {},
// //   });

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
//     formData.append('receipt', file);

//     try {
//       const response = await fetch('http://localhost:3000/api/refueling-scan/scan', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process receipt');
//       }

//       const data = await response.json();
//       console.log('Extracted data:', data);

//       // Update form fields with extracted data
//       setValue('pricePerLiter', parseFloat(data.extractedData.ils.pricePerLiter));
//       setValue('totalCost', parseFloat(data.extractedData.ils.totalCost));
//       setValue('liters', parseFloat(data.extractedData.ils.liters));
      
//       // You can set other fields if they're available in the response
//       if (data.savedRecord) {
//         setValue('date', data.savedRecord.date?.split('T')[0]);
//         setValue('time', data.savedRecord.time);
//         setValue('gasStation', data.savedRecord.gasStation);
//       }
//     } catch (error) {
//       console.error('Error processing receipt:', error);
//       alert('Failed to process receipt. Please try again or fill the form manually.');
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

//        {/* Image Upload Button */}
//        <Box sx={{ mb: 2 }}>
//         <input
//           accept="image/*"
//           style={{ display: 'none' }}
//           id="receipt-upload"
//           type="file"
//           onChange={handleImageUpload}
//         />
//         <label htmlFor="receipt-upload">
//           <Button
//             variant="contained"
//             component="span"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : 'Upload Receipt Image'}
//           </Button>
//         </label>
//         {loading && (
//           <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
//             Processing receipt...
//           </Typography>
//         )}
//       </Box>

//       {/* License Plate */}
//       <TextField
//         label="License Plate"
//         variant="outlined"
//         {...register("license_plate", { required: "License plate is required" })}
//         error={!!errors.license_plate}
//         helperText={errors.license_plate?.message?.toString()} 
//         fullWidth
//       />

//       {/* Date */}
//       <TextField
//         label="Date"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register("date", { required: "Date is required" })}
//         error={!!errors.date}
//         helperText={errors.date?.message?.toString()} 
//         fullWidth
//       />

//       {/* Time */}
//       <TextField
//         label="Time"
//         type="time"
//         InputLabelProps={{ shrink: true }}
//         {...register("time", { required: "Time is required" })}
//         error={!!errors.time}
//         helperText={errors.time?.message?.toString()} 
//         fullWidth
//       />

//       {/* Odometer */}
//       <TextField
//         label="Odometer"
//         type="number"
//         {...register("odometer", { required: "Odometer is required" })}
//         error={!!errors.odometer}
//         helperText={errors.odometer?.message?.toString()} 
//         fullWidth
//       />

//       {/* Kind of Fuel */}
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
//         {errors.kindOfFuel && (
//           <Typography variant="caption" color="error">
//             {errors.kindOfFuel.message?.toString()}
//           </Typography>
//         )}
//       </FormControl>

//       {/* Price per Liter */}
//       <TextField
//         label="Price per Liter"
//         type="number"
//         inputProps={{ step: "0.01" }}
//         {...register("pricePerLiter", { required: "Price per liter is required" })}
//         error={!!errors.pricePerLiter}
//         helperText={errors.pricePerLiter?.message?.toString()}
//         fullWidth
//       />

//       {/* Total Cost */}
//       <TextField
//         label="Total Cost"
//         type="number"
//         inputProps={{ step: "0.01" }}
//         {...register("totalCost", { required: "Total cost is required" })}
//         error={!!errors.totalCost}
//         helperText={errors.totalCost?.message?.toString()} 
//         fullWidth
//       />

//       {/* Liters */}
//       <TextField
//         label="Liters"
//         type="number"
//         inputProps={{ step: "0.01" }}
//         {...register("liters", { required: "Liters is required" })}
//         error={!!errors.liters}
//         helperText={errors.liters?.message?.toString()}
//         fullWidth
//       />

//       {/* Gas Station */}
//       <TextField
//         label="Gas Station"
//         variant="outlined"
//         {...register("gasStation")}
//         fullWidth
//       />

//       {/* Driver */}
//       <TextField
//         label="Driver"
//         variant="outlined"
//         {...register("driver")}
//         fullWidth
//       />

//       {/* Notes */}
//       <TextField
//         label="Notes"
//         variant="outlined"
//         multiline
//         rows={3}
//         {...register("notes")}
//         fullWidth
//       />

//       {/* Submit Button */}
//       <Button type="submit" variant="contained" color="primary">
//         Save
//       </Button>
//     </Box>
//   );
// };

// export default RefuelingForm;

//work without fetch autumatically time and date
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

//       // Update form fields with extracted data
//       setValue("pricePerLiter", parseFloat(data.extractedData.ils.pricePerLiter));
//       setValue("totalCost", parseFloat(data.extractedData.ils.totalCost));
//       setValue("liters", parseFloat(data.extractedData.ils.liters));

//       if (data.savedRecord) {
//         setValue("date", data.savedRecord.date?.split("T")[0]);
//         setValue("time", data.savedRecord.time);
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
//         { label: "License Plate", name: "license_plate" },
//         { label: "Date", name: "date", type: "date" },
//         { label: "Time", name: "time", type: "time" },
//         { label: "Odometer", name: "odometer", type: "number" },
//         { 
//           label: "Price per Liter", 
//           name: "pricePerLiter", 
//           type: "number", 
//           step: "0.01", 
//           validate: (value) => /^[0-9]*\.?[0-9]{0,2}$/.test(value) || "Up to 2 decimal places only" 
//         },
//         { label: "Total Cost", name: "totalCost", type: "number", step: "0.01" },
//         { label: "Liters", name: "liters", type: "number", step: "0.01" },
//         { label: "Gas Station", name: "gasStation" },
//         { label: "Driver", name: "driver" },
//         { label: "Notes", name: "notes", multiline: true, rows: 3 },
//       ].map(({ label, name, validate, ...rest }) => (
//         <TextField
//           key={name}
//           label={label}
//           variant="outlined"
//           {...register(name, { 
//             required: `${label} is required`,
//             ...(validate ? { validate } : {}) // Add validation if provided
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



//this option fetch all the desirable information from the reciept but problem in the save because of the decimal numbers
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
//         { label: "License Plate", name: "license_plate" },
//         { label: "Date", name: "date", type: "date" },
//         { label: "Time", name: "time", type: "time" },
//         { label: "Odometer", name: "odometer", type: "number" },
//         { 
//           label: "Price per Liter", 
//           name: "pricePerLiter", 
//           type: "number", 
//           step: "0.01", 
//           validate: (value) => /^[0-9]*\.?[0-9]{0,2}$/.test(value) || "Up to 2 decimal places only" 
//         },
//         { label: "Total Cost", name: "totalCost", type: "number", step: "0.01" },
//         { label: "Liters", name: "liters", type: "number", step: "0.01" },
//         { label: "Gas Station", name: "gasStation" },
//         { label: "Driver", name: "driver" },
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

//work without decimal numbers
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
//         { label: "License Plate", name: "license_plate" },
//         { label: "Date", name: "date", type: "date" },
//         { label: "Time", name: "time", type: "time" },
//         { label: "Odometer", name: "odometer", type: "number" },
//         { 
//           label: "Price per Liter", 
//           name: "pricePerLiter", 
//           type: "number", 
//           step: "0.01", 
//           validate: (value) => /^[0-9]*\.?[0-9]{0,2}$/.test(value) || "Up to 2 decimal places only" 
//         },
//         { label: "Total Cost", name: "totalCost", type: "number", step: "0.01" },
//         { label: "Liters", name: "liters", type: "number", step: "0.01" },
//         { label: "Gas Station", name: "gasStation" },
//         { label: "Driver", name: "driver" },
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
//         { label: "License Plate", name: "license_plate" },
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
//         { label: "Gas Station", name: "gasStation" },
//         { label: "Driver", name: "driver" },
//         { label: "Notes", name: "notes", multiline: true, rows: 3 },
//       ].map(({ label, name, validate, ...rest }) => (
//         <TextField
//           key={name}
//           label={label}
//           variant="outlined"
//           type="number"
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


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const fuelTypes = [
  "95 Octane (Regular Gasoline)",
  "98 Octane (Premium Gasoline)",
  "Electric",
  "Hybrid",
  "Diesel",
];

const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: existingRefuel || {},
  });

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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 600, margin: "0 auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Refueling Form
      </Typography>

      <Box sx={{ mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="receipt-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="receipt-upload">
          <Button variant="contained" component="span" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Upload Receipt Image"}
          </Button>
        </label>
      </Box>

      {[ 
        { label: "License Plate", name: "license_plate", type: "text" },
        { label: "Date", name: "date", type: "date" },
        { label: "Time", name: "time", type: "time" },
        { label: "Odometer", name: "odometer", type: "number" },
        { 
          label: "Price per Liter", 
          name: "pricePerLiter", 
          type: "number", 
          inputProps: { 
            step: "0.01", 
            min: "0" 
          },
          validate: (value) => !isNaN(value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || "Price per liter must be a valid number with up to 2 decimal places"
        },
        { 
          label: "Total Cost", 
          name: "totalCost", 
          type: "number", 
          inputProps: { 
            step: "0.01", 
            min: "0" 
          },
          validate: (value) => !isNaN(value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || "Total cost must be a valid number with up to 2 decimal places"
        },
        { 
          label: "Liters", 
          name: "liters", 
          type: "number", 
          inputProps: { 
            step: "0.01", 
            min: "0" 
          },
          validate: (value) => !isNaN(value) && /^[0-9]+(\.[0-9]{1,2})?$/.test(value) || "Liters must be a valid number with up to 2 decimal places"
        },
        { label: "Gas Station", name: "gasStation", type: "text" },
        { label: "Driver", name: "driver", type: "text" },
        { label: "Notes", name: "notes", multiline: true, rows: 3 },
      ].map(({ label, name, validate, ...rest }) => (
        <TextField
          key={name}
          label={label}
          variant="outlined"
          {...register(name, { 
            required: `${label} is required`,
            ...(validate ? { validate } : {}) 
          })}
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString()}
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...rest}
        />
      ))}

      <FormControl fullWidth error={!!errors.kindOfFuel}>
        <InputLabel>Kind of Fuel</InputLabel>
        <Select
          {...register("kindOfFuel", { required: "Kind of fuel is required" })}
          defaultValue=""
        >
          <MenuItem value="">Select a fuel type</MenuItem>
          {fuelTypes.map((fuel, index) => (
            <MenuItem key={index} value={fuel}>
              {fuel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default RefuelingForm;
