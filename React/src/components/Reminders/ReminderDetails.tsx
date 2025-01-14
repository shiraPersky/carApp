import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteReminder } from '../../services/serviceApi';
import React from 'react';

const ReminderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reminder, setReminder] = useState<any>(null);
  const [reminders, setReminders] = useState<any[]>([]);

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

  useEffect(() => {
    // Once reminders are fetched, find the reminder that matches the ID
    if (id && reminders.length > 0) {
      const foundReminder = reminders.find((reminder) => reminder.id === Number(id));
      setReminder(foundReminder || null);
    }
  }, [id, reminders]);

  // Handle delete operation
  const handleDelete = async () => {
    try {
      await deleteReminder(Number(id)); // Call deleteReminder function
      navigate('/reminders');
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  if (!reminder) return <div>Loading...</div>;

  return (
    <div>
      <h2>Reminder Details</h2>
      <p>Description: {reminder.description}</p>
      <p>Start Date: {new Date(reminder.start_date).toLocaleDateString()}</p>
      <p>Start Odometer: {reminder.start_odometer}</p>
      <p>Due Date: {new Date(reminder.due_date).toLocaleDateString()}</p>
      <p>Next Due KM: {reminder.next_due_km}</p>
      <p>Repeat by Days: {reminder.repeat_by_days}</p>
      <p>Repeat by KM: {reminder.repeat_by_km}</p>
      <p>Notify Before Days: {reminder.notify_before_days}</p>
      <p>Notify Before KM: {reminder.notify_before_km}</p>
      <p>Completed: {reminder.completed ? 'Yes' : 'No'}</p>

      <div>
        <Link to={`/reminders/edit/${reminder.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ReminderDetails;
