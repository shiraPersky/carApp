import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ReminderForm = ({ existingReminder, onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: existingReminder || {},
  });

  const [activeTab, setActiveTab] = useState(""); // No tab active by default
  const [oneTimeOption, setOneTimeOption] = useState("date"); // "date" or "km"
  const [repeatOption, setRepeatOption] = useState({ date: false, km: false }); // Control for repeat options

  const handleFormSubmit = (data: any) => {
    // For one-time reminders (date or km-based)
    if (oneTimeOption === 'date') {
      data.repeat_by_days = null;
      data.repeat_by_km = null;
    }
    if (oneTimeOption === 'km') {
        data.repeat_by_days = null;
        data.repeat_by_km = null;
        data.due_date = null;
        data.start_date = null;
        data.start_odometer = null;
    }
  
    // For repeat reminders
    if (repeatOption.date) {
      data.repeat_by_days = data.repeat_by_days ? Math.max(1, data.repeat_by_days) : null;  // Ensuring it's a positive number
    }
    if (repeatOption.km) {
      data.repeat_by_km = data.repeat_by_km ? Math.max(1, data.repeat_by_km) : null;  // Ensuring it's a positive number
    }
  
    // Handling notify_before_days and notify_before_km
    data.notify_before_days = data.notify_before_days ? Math.max(1, data.notify_before_days) : null; // Ensure it's positive
    data.notify_before_km = data.notify_before_km ? Math.max(1, data.notify_before_km) : null; // Ensure it's positive
  
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Description</label>
        <input
          type="text"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && typeof errors.description.message === "string" && (
          <span>{errors.description.message}</span>
        )}

        <label>License Plate</label>
        <input
          type="text"
          {...register('license_plate', { required: 'License plate is required' })}
        />
        {errors.license_plate && typeof errors.license_plate.message === "string" && (
          <span>{errors.license_plate.message}</span>
        )}
      </div>

      <div className="tabs">
        <button type="button" onClick={() => setActiveTab("one-time")}>
          Just One Time
        </button>
        <button type="button" onClick={() => setActiveTab("repeat")}>
          Repeat Every
        </button>
      </div>

      {activeTab === "one-time" && (
        <div>
          <h3>One-Time Options</h3>
          <div>
            <label>
              <input
                type="radio"
                value="date"
                checked={oneTimeOption === "date"}
                onChange={() => setOneTimeOption("date")}
              />
              By Date
            </label>
            <label>
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
            <div>
              <label>Start Date</label>
              <input
                type="date"
                {...register('start_date', { required: 'Start date is required' })}
              />
              {errors.start_date && typeof errors.start_date.message === "string" && (
                <span>{errors.start_date.message}</span>
              )}

              <label>Due Date</label>
              <input
                type="date"
                {...register('due_date', { required: 'Due date is required' })}
              />
              {errors.due_date && typeof errors.due_date.message === "string" && (
                <span>{errors.due_date.message}</span>
              )}

              <label>Notify Before Days</label>
              <input
                type="number"
                {...register('notify_before_days')}
              />
            </div>
          )}

          {oneTimeOption === "km" && (
            <div>
              <label>Start Odometer</label>
              <input
                type="number"
                {...register('start_odometer', { required: 'Start odometer is required' })}
              />
              {errors.start_odometer && typeof errors.start_odometer.message === "string" && (
                <span>{errors.start_odometer.message}</span>
              )}

              <label>Next Due KM</label>
              <input
                type="number"
                {...register('next_due_km', { required: 'Next due km is required' })}
              />
              {errors.next_due_km && typeof errors.next_due_km.message === "string" && (
                <span>{errors.next_due_km.message}</span>
              )}

              <label>Notify Before KM</label>
              <input
                type="number"
                {...register('notify_before_km')}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "repeat" && (
        <div>
          <h3>Repeat Options</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={repeatOption.date}
                onChange={() =>
                  setRepeatOption(prev => ({ ...prev, date: !prev.date }))
                }
              />
              By Date
            </label>
            <label>
              <input
                type="checkbox"
                checked={repeatOption.km}
                onChange={() =>
                  setRepeatOption(prev => ({ ...prev, km: !prev.km }))
                }
              />
              By KM
            </label>
          </div>

          {repeatOption.date && (
            <div>
              <label>Start Date</label>
              <input
                type="date"
                {...register('start_date', { required: 'Start date is required' })}
              />
              {errors.start_date && typeof errors.start_date.message === "string" && (
                <span>{errors.start_date.message}</span>
              )}

              <label>Due Date</label>
              <input
                type="date"
                {...register('due_date')}
              />

              <label>Repeat Every X Days</label>
              <input
                type="number"
                {...register('repeat_by_days')}
              />

              <label>Notify Before Days</label>
              <input
                type="number"
                {...register('notify_before_days')}
              />
            </div>
          )}

          {repeatOption.km && (
            <div>
              <label>Start Odometer</label>
              <input
                type="number"
                {...register('start_odometer', { required: 'Start odometer is required' })}
              />
              {errors.start_odometer && typeof errors.start_odometer.message === "string" && (
                <span>{errors.start_odometer.message}</span>
              )}

              <label>Next Due KM</label>
              <input
                type="number"
                {...register('next_due_km')}
              />

              <label>Repeat Every X KM</label>
              <input
                type="number"
                {...register('repeat_by_km')}
              />

              <label>Notify Before KM</label>
              <input
                type="number"
                {...register('notify_before_km')}
              />
            </div>
          )}
        </div>
      )}

      <button type="submit">Save</button>
    </form>
  );
};

export default ReminderForm;
