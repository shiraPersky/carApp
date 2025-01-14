import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReminderForm from '../../components/Reminders/ReminderForm';  // Import your ReminderForm
import { updateReminder } from '../../services/serviceApi';  // Adjust to your service API

const EditReminderPage = () => {
  const { id } = useParams(); // Get the reminder ID from the URL
  const navigate = useNavigate();
  const [reminder, setReminder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<any[]>([]);

  // Fetch all reminders and then find the specific one by ID
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('http://localhost:3000/reminders'); // Fetch all reminders
        if (!response.ok) {
          throw new Error('Failed to fetch reminders');
        }
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []); // Fetch all reminders once on component mount

  // Once reminders are fetched, find the specific reminder by ID
  useEffect(() => {
    if (id && reminders.length > 0) {
      const foundReminder = reminders.find((reminder) => reminder.id === Number(id));
      setReminder(foundReminder || null);
      setLoading(false); // Stop loading when the reminder is found
    }
  }, [id, reminders]); // Only run when reminders or id change

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log("Submitting update with data:", data); // Test log data being sent to API
    try {
      const { id, ...reminderData } = data;  // Remove id from data if it's part of the form data
      await updateReminder(Number(id), data); // Update the reminder by ID
      navigate('/reminders'); // Navigate back to the reminders list
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div>
      <h2>Edit Reminder</h2>
      <ReminderForm existingReminder={reminder} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditReminderPage;
