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
        {/* Grid for reminders */}
        {reminders.map((reminder) => {
          console.log(reminder); // Log the reminder object to check if all fields are available
          return (
            <div key={reminder.id} className="reminder-card">
              <Link to={`/reminders/details/${reminder.id}`}>
                <h3>{reminder.description}</h3>
                <p>Start Date: {new Date(reminder.start_date).toLocaleDateString()}</p>
                <p>Due Date: {new Date(reminder.due_date).toLocaleDateString()}</p>
                <p>Start Odometer: {reminder.start_odometer}</p>
                <p>Next Due KM: {reminder.next_due_km}</p>
                <p>Repeat by Days: {reminder.repeat_by_days}</p>
                <p>Repeat by KM: {reminder.repeat_by_km}</p>
                <p>Notify Before Days: {reminder.notify_before_days}</p>
                <p>Notify Before KM: {reminder.notify_before_km}</p>
                <p>Completed: {reminder.completed ? 'Yes' : 'No'}</p>
              </Link>
              <button onClick={() => handleDelete(reminder.id)}>Delete</button>
            </div>
          );
        })}

        {/* Add New Reminder Button */}
        <div className="reminder-card add-button">
          <Link to="/reminders/add">+</Link>
        </div>
      </div>
    </div>
  );
};

export default ReminderList;
