import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReminderForm from '../../components/Reminders/ReminderForm';  // Import your ReminderForm
import { createReminder } from '../../services/serviceApi';  // Adjust to your service API

const AddReminderPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log('Form data being sent:', data); // Log the data to inspect before submitting
    try {
      await createReminder(data); // Create a new reminder entry
      navigate('/reminders'); // Navigate back to the reminders list
    } catch (error) {
      console.error('Error adding new reminder:', error);
    }
  };

  return (
    <div>
      <h2>Add New Reminder</h2>
      <ReminderForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddReminderPage;
