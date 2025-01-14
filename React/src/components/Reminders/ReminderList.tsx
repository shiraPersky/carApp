import { useState, useEffect } from 'react';
import { Reminder, getReminders, deleteReminder } from '../../services/serviceApi';
import React from 'react';
import { Link } from 'react-router-dom';


const ReminderList = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getReminders() as Reminder[];
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };
    fetchReminders();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteReminder(id);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <div>
      <h2>Your Reminders</h2>
      <div className="reminder-grid">
      <h2>One-Time Reminders</h2>
        {reminders.filter(r => !r.repeat_by_days && !r.repeat_by_km).map(reminder => (
        <div key={reminder.id} className="reminder-card">
            <h3>{reminder.description}</h3>
            <p>Due Date: {new Date(reminder.due_date).toLocaleDateString()}</p>
        </div>
        ))}

        <h2>Repeating Reminders</h2>
        {reminders.filter(r => r.repeat_by_days || r.repeat_by_km).map(reminder => (
        <div key={reminder.id} className="reminder-card">
            <h3>{reminder.description}</h3>
            <p>Repeat Every {reminder.repeat_by_days || 0} Days</p>
            <p>Repeat Every {reminder.repeat_by_km || 0} KM</p>
        </div>
        ))}

        </div>


        {/* Add New Reminder Button */}
        <div className="reminder-card add-button">
          <Link to="/reminders/add">+</Link>
        </div>
      </div>
  );
};

export default ReminderList;
