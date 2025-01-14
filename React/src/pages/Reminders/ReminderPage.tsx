import { useState, useEffect } from 'react';
import { Reminder, getReminders, deleteReminder } from '../../services/serviceApi'; // Adjust according to your service API
import { Link } from 'react-router-dom';
import React from 'react';

const ReminderPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getReminders() as Reminder[]; // Fetch reminders from API
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };
    fetchReminders();
  }, []); // Empty dependency array to run once on component mount

  const handleDelete = async (id: number) => {
    try {
      await deleteReminder(id); // Delete reminder by ID
      setReminders(reminders.filter((reminder) => reminder.id !== id)); // Remove from state
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <div>
      <h2>Your Reminders</h2>
      <Link to="/reminders/add">Add New Reminder</Link>
      <table>
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Start Odometer</th>
            <th>Due Date</th>
            <th>Next Due KM</th>
            <th>Repeat By Days</th>
            <th>Repeat By KM</th>
            <th>Notify Before Days</th>
            <th>Notify Before KM</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id}>
              <td>{reminder.license_plate}</td>
              <td>{reminder.description}</td>
              <td>{reminder.start_date ? new Date(reminder.start_date).toLocaleDateString() : '-'}</td>
              <td>{reminder.start_odometer}</td>
              <td>{reminder.due_date ? new Date(reminder.due_date).toLocaleDateString() : '-'}</td>
              <td>{reminder.next_due_km}</td>
              <td>{reminder.repeat_by_days}</td>
              <td>{reminder.repeat_by_km}</td>
              <td>{reminder.notify_before_days}</td>
              <td>{reminder.notify_before_km}</td>
              <td>{reminder.completed ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/reminders/edit/${reminder.id}`}>Edit</Link>
                <button onClick={() => handleDelete(reminder.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReminderPage;
