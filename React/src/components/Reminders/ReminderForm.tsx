// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

// const ReminderForm = ({ existingReminder, onSubmit }: any) => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: existingReminder || {},
//   });

//   const [activeTab, setActiveTab] = useState(""); // No tab active by default
//   const [oneTimeOption, setOneTimeOption] = useState("date"); // "date" or "km"
//   const [repeatOption, setRepeatOption] = useState({ date: false, km: false }); // Control for repeat options

//   const handleFormSubmit = (data: any) => {
//     // For one-time reminders (date or km-based)
//     if (oneTimeOption === 'date') {
//       data.repeat_by_days = null;
//       data.repeat_by_km = null;
//     }
//     if (oneTimeOption === 'km') {
//         data.repeat_by_days = null;
//         data.repeat_by_km = null;
//         data.due_date = null;
//         data.start_date = null;
//         data.start_odometer = null;
//     }
  
//     // For repeat reminders
//     if (repeatOption.date) {
//       data.repeat_by_days = data.repeat_by_days ? Math.max(1, data.repeat_by_days) : null;  // Ensuring it's a positive number
//     }
//     if (repeatOption.km) {
//       data.repeat_by_km = data.repeat_by_km ? Math.max(1, data.repeat_by_km) : null;  // Ensuring it's a positive number
//     }
  
//     // Handling notify_before_days and notify_before_km
//     data.notify_before_days = data.notify_before_days ? Math.max(1, data.notify_before_days) : null; // Ensure it's positive
//     data.notify_before_km = data.notify_before_km ? Math.max(1, data.notify_before_km) : null; // Ensure it's positive
  
//     // Convert to numbers where applicable
//     data.start_odometer = data.start_odometer ? parseInt(data.start_odometer, 10) : null;
//     data.next_due_km = data.next_due_km ? parseInt(data.next_due_km, 10) : null;
//     data.repeat_by_days = data.repeat_by_days ? parseInt(data.repeat_by_days, 10) : null;
//     data.repeat_by_km = data.repeat_by_km ? parseInt(data.repeat_by_km, 10) : null;
//     data.notify_before_days = data.notify_before_days ? parseInt(data.notify_before_days, 10) : null;
//     data.notify_before_km = data.notify_before_km ? parseInt(data.notify_before_km, 10) : null;
  
//     if (data.start_date) data.start_date = new Date(data.start_date);
//     if (data.due_date) data.due_date = new Date(data.due_date);
  
//     onSubmit(data);
//   };
  
  

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)}>
//       <div>
//         <label>Description</label>
//         <input
//           type="text"
//           {...register('description', { required: 'Description is required' })}
//         />
//         {errors.description && typeof errors.description.message === "string" && (
//           <span>{errors.description.message}</span>
//         )}

//         <label>License Plate</label>
//         <input
//           type="text"
//           {...register('license_plate', { required: 'License plate is required' })}
//         />
//         {errors.license_plate && typeof errors.license_plate.message === "string" && (
//           <span>{errors.license_plate.message}</span>
//         )}
//       </div>

//       <div className="tabs">
//         <button type="button" onClick={() => setActiveTab("one-time")}>
//           Just One Time
//         </button>
//         <button type="button" onClick={() => setActiveTab("repeat")}>
//           Repeat Every
//         </button>
//       </div>

//       {activeTab === "one-time" && (
//         <div>
//           <h3>One-Time Options</h3>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="date"
//                 checked={oneTimeOption === "date"}
//                 onChange={() => setOneTimeOption("date")}
//               />
//               By Date
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="km"
//                 checked={oneTimeOption === "km"}
//                 onChange={() => setOneTimeOption("km")}
//               />
//               By KM
//             </label>
//           </div>

//           {oneTimeOption === "date" && (
//             <div>
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 {...register('start_date', { required: 'Start date is required' })}
//               />
//               {errors.start_date && typeof errors.start_date.message === "string" && (
//                 <span>{errors.start_date.message}</span>
//               )}

//               <label>Due Date</label>
//               <input
//                 type="date"
//                 {...register('due_date', { required: 'Due date is required' })}
//               />
//               {errors.due_date && typeof errors.due_date.message === "string" && (
//                 <span>{errors.due_date.message}</span>
//               )}

//               <label>Notify Before Days</label>
//               <input
//                 type="number"
//                 {...register('notify_before_days')}
//               />
//             </div>
//           )}

//           {oneTimeOption === "km" && (
//             <div>
//               <label>Start Odometer</label>
//               <input
//                 type="number"
//                 {...register('start_odometer', { required: 'Start odometer is required' })}
//               />
//               {errors.start_odometer && typeof errors.start_odometer.message === "string" && (
//                 <span>{errors.start_odometer.message}</span>
//               )}

//               <label>Next Due KM</label>
//               <input
//                 type="number"
//                 {...register('next_due_km', { required: 'Next due km is required' })}
//               />
//               {errors.next_due_km && typeof errors.next_due_km.message === "string" && (
//                 <span>{errors.next_due_km.message}</span>
//               )}

//               <label>Notify Before KM</label>
//               <input
//                 type="number"
//                 {...register('notify_before_km')}
//               />
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === "repeat" && (
//         <div>
//           <h3>Repeat Options</h3>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={repeatOption.date}
//                 onChange={() =>
//                   setRepeatOption(prev => ({ ...prev, date: !prev.date }))
//                 }
//               />
//               By Date
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={repeatOption.km}
//                 onChange={() =>
//                   setRepeatOption(prev => ({ ...prev, km: !prev.km }))
//                 }
//               />
//               By KM
//             </label>
//           </div>

//           {repeatOption.date && (
//             <div>
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 {...register('start_date', { required: 'Start date is required' })}
//               />
//               {errors.start_date && typeof errors.start_date.message === "string" && (
//                 <span>{errors.start_date.message}</span>
//               )}

//               <label>Due Date</label>
//               <input
//                 type="date"
//                 {...register('due_date')}
//               />

//               <label>Repeat Every X Days</label>
//               <input
//                 type="number"
//                 {...register('repeat_by_days')}
//               />

//               <label>Notify Before Days</label>
//               <input
//                 type="number"
//                 {...register('notify_before_days')}
//               />
//             </div>
//           )}

//           {repeatOption.km && (
//             <div>
//               <label>Start Odometer</label>
//               <input
//                 type="number"
//                 {...register('start_odometer', { required: 'Start odometer is required' })}
//               />
//               {errors.start_odometer && typeof errors.start_odometer.message === "string" && (
//                 <span>{errors.start_odometer.message}</span>
//               )}

//               <label>Next Due KM</label>
//               <input
//                 type="number"
//                 {...register('next_due_km')}
//               />

//               <label>Repeat Every X KM</label>
//               <input
//                 type="number"
//                 {...register('repeat_by_km')}
//               />

//               <label>Notify Before KM</label>
//               <input
//                 type="number"
//                 {...register('notify_before_km')}
//               />
//             </div>
//           )}
//         </div>
//       )}

//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default ReminderForm;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/ReminderForm.css';

const ReminderForm = ({ existingReminder, onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: existingReminder || {},
  });

  const [activeTab, setActiveTab] = useState("one-time"); // Default to one-time
  const [oneTimeOption, setOneTimeOption] = useState("date"); // "date" or "km"
  const [repeatOption, setRepeatOption] = useState({ date: false, km: false }); // Control for repeat options

  const handleFormSubmit = (data: any) => {
    // For one-time reminders (date or km-based)
    if (activeTab === "one-time") {
      if (oneTimeOption === 'date') {
        data.repeat_by_days = null;
        data.repeat_by_km = null;
        data.next_due_km = null;
      }
      if (oneTimeOption === 'km') {
        data.repeat_by_days = null;
        data.repeat_by_km = null;
        data.due_date = null;
        data.start_date = null;
      }
    }
  
    // For repeat reminders
    if (activeTab === "repeat") {
      if (repeatOption.date) {
        data.repeat_by_days = data.repeat_by_days ? Math.max(1, data.repeat_by_days) : null;
      } else {
        data.repeat_by_days = null;
      }
      
      if (repeatOption.km) {
        data.repeat_by_km = data.repeat_by_km ? Math.max(1, data.repeat_by_km) : null;
      } else {
        data.repeat_by_km = null;
      }
    }
  
    // Handling notify values
    data.notify_before_days = data.notify_before_days ? Math.max(1, data.notify_before_days) : null;
    data.notify_before_km = data.notify_before_km ? Math.max(1, data.notify_before_km) : null;
  
    // Convert to numbers where applicable
    data.start_odometer = data.start_odometer ? parseInt(data.start_odometer, 10) : null;
    data.next_due_km = data.next_due_km ? parseInt(data.next_due_km, 10) : null;
    data.repeat_by_days = data.repeat_by_days ? parseInt(data.repeat_by_days, 10) : null;
    data.repeat_by_km = data.repeat_by_km ? parseInt(data.repeat_by_km, 10) : null;
    data.notify_before_days = data.notify_before_days ? parseInt(data.notify_before_days, 10) : null;
    data.notify_before_km = data.notify_before_km ? parseInt(data.notify_before_km, 10) : null;
  
    if (data.start_date) data.start_date = new Date(data.start_date);
    if (data.due_date) data.due_date = new Date(data.due_date);
  
    onSubmit(data);
  };

  return (
    <div className="reminder-form-container">
      <div className="reminder-form-card">
        <h3 className="reminder-form-section-title">Reminder Details</h3>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">License Plate</label>
              <input
                type="text"
                className={`form-input ${errors.license_plate ? 'error-input' : ''}`}
                {...register('license_plate', { required: 'License plate is required' })}
              />
              {errors.license_plate && typeof errors.license_plate.message === "string" && (
                <span className="error-message">{errors.license_plate.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full-width">
              <label className="form-label">Description</label>
              <input
                type="text"
                className={`form-input ${errors.description ? 'error-input' : ''}`}
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && typeof errors.description.message === "string" && (
                <span className="error-message">{errors.description.message}</span>
              )}
            </div>
          </div>

          <div className="reminder-tabs">
            <button 
              type="button" 
              className={`tab-button ${activeTab === "one-time" ? 'active' : ''}`}
              onClick={() => setActiveTab("one-time")}
            >
              Just One Time
            </button>
            <button 
              type="button" 
              className={`tab-button ${activeTab === "repeat" ? 'active' : ''}`}
              onClick={() => setActiveTab("repeat")}
            >
              Repeat Every
            </button>
          </div>

          {activeTab === "one-time" && (
            <div className="tab-content">
              <div className="form-row radio-group">
                <label className={`radio-label ${oneTimeOption === "date" ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="date"
                    checked={oneTimeOption === "date"}
                    onChange={() => setOneTimeOption("date")}
                  />
                  By Date
                </label>
                <label className={`radio-label ${oneTimeOption === "km" ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="km"
                    checked={oneTimeOption === "km"}
                    onChange={() => setOneTimeOption("km")}
                  />
                  By KM
                </label>
              </div>

              {oneTimeOption === "date" && (
                <>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Start Date</label>
                      <div className="date-input-container">
                        <input
                          type="date"
                          className={`form-input ${errors.start_date ? 'error-input' : ''}`}
                          {...register('start_date', { required: 'Start date is required' })}
                        />
                        <span className="input-hint">dd/mm/yyyy</span>
                      </div>
                      {errors.start_date && typeof errors.start_date.message === "string" && (
                        <span className="error-message">{errors.start_date.message}</span>
                      )}
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Due Date</label>
                      <div className="date-input-container">
                        <input
                          type="date"
                          className={`form-input ${errors.due_date ? 'error-input' : ''}`}
                          {...register('due_date', { required: 'Due date is required' })}
                        />
                        <span className="input-hint">dd/mm/yyyy</span>
                      </div>
                      {errors.due_date && typeof errors.due_date.message === "string" && (
                        <span className="error-message">{errors.due_date.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Notify Before Days</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('notify_before_days')}
                      />
                    </div>
                    <div className="form-field"></div> {/* Empty field for alignment */}
                  </div>
                </>
              )}

              {oneTimeOption === "km" && (
                <>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Start Odometer</label>
                      <input
                        type="number"
                        className={`form-input ${errors.start_odometer ? 'error-input' : ''}`}
                        {...register('start_odometer', { required: 'Start odometer is required' })}
                      />
                      {errors.start_odometer && typeof errors.start_odometer.message === "string" && (
                        <span className="error-message">{errors.start_odometer.message}</span>
                      )}
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Next Due KM</label>
                      <input
                        type="number"
                        className={`form-input ${errors.next_due_km ? 'error-input' : ''}`}
                        {...register('next_due_km', { required: 'Next due km is required' })}
                      />
                      {errors.next_due_km && typeof errors.next_due_km.message === "string" && (
                        <span className="error-message">{errors.next_due_km.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Notify Before KM</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('notify_before_km')}
                      />
                    </div>
                    <div className="form-field"></div> {/* Empty field for alignment */}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "repeat" && (
            <div className="tab-content">
              <div className="form-row checkbox-group">
                <label className={`checkbox-label ${repeatOption.date ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={repeatOption.date}
                    onChange={() => setRepeatOption(prev => ({ ...prev, date: !prev.date }))}
                  />
                  By Date
                </label>
                <label className={`checkbox-label ${repeatOption.km ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={repeatOption.km}
                    onChange={() => setRepeatOption(prev => ({ ...prev, km: !prev.km }))}
                  />
                  By KM
                </label>
              </div>

              {repeatOption.date && (
                <>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Start Date</label>
                      <div className="date-input-container">
                        <input
                          type="date"
                          className={`form-input ${errors.start_date ? 'error-input' : ''}`}
                          {...register('start_date', { required: repeatOption.date ? 'Start date is required' : false })}
                        />
                        <span className="input-hint">dd/mm/yyyy</span>
                      </div>
                      {errors.start_date && typeof errors.start_date.message === "string" && (
                        <span className="error-message">{errors.start_date.message}</span>
                      )}
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">First Due Date</label>
                      <div className="date-input-container">
                        <input
                          type="date"
                          className="form-input"
                          {...register('due_date')}
                        />
                        <span className="input-hint">dd/mm/yyyy</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Repeat Every X Days</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('repeat_by_days')}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Notify Before Days</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('notify_before_days')}
                      />
                    </div>
                  </div>
                </>
              )}

              {repeatOption.km && (
                <>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Start Odometer</label>
                      <input
                        type="number"
                        className={`form-input ${errors.start_odometer ? 'error-input' : ''}`}
                        {...register('start_odometer', { required: repeatOption.km ? 'Start odometer is required' : false })}
                      />
                      {errors.start_odometer && typeof errors.start_odometer.message === "string" && (
                        <span className="error-message">{errors.start_odometer.message}</span>
                      )}
                    </div>
                    
                    <div className="form-field">
                      <label className="form-label">Next Due KM</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('next_due_km')}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Repeat Every X KM</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('repeat_by_km')}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Notify Before KM</label>
                      <input
                        type="number"
                        className="form-input"
                        {...register('notify_before_km')}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;