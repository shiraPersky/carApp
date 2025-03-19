// import { useState, useEffect } from 'react';
// import { Reminder, getReminders, deleteReminder } from '../../services/serviceApi'; // Adjust according to your service API
// import { Link } from 'react-router-dom';
// import React from 'react';

// const ReminderPage = () => {
//   const [reminders, setReminders] = useState<Reminder[]>([]);

//   useEffect(() => {
//     const fetchReminders = async () => {
//       try {
//         const data = await getReminders() as Reminder[]; // Fetch reminders from API
//         setReminders(data);
//       } catch (error) {
//         console.error('Error fetching reminders:', error);
//       }
//     };
//     fetchReminders();
//   }, []); // Empty dependency array to run once on component mount

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteReminder(id); // Delete reminder by ID
//       setReminders(reminders.filter((reminder) => reminder.id !== id)); // Remove from state
//     } catch (error) {
//       console.error('Error deleting reminder:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Your Reminders</h2>
//       <Link to="/reminders/add">Add New Reminder</Link>
//       <table>
//         <thead>
//           <tr>
//             <th>License Plate</th>
//             <th>Description</th>
//             <th>Start Date</th>
//             <th>Start Odometer</th>
//             <th>Due Date</th>
//             <th>Next Due KM</th>
//             <th>Repeat By Days</th>
//             <th>Repeat By KM</th>
//             <th>Notify Before Days</th>
//             <th>Notify Before KM</th>
//             <th>Completed</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reminders.map((reminder) => (
//             <tr key={reminder.id}>
//               <td>{reminder.license_plate}</td>
//               <td>{reminder.description}</td>
//               <td>{reminder.start_date ? new Date(reminder.start_date).toLocaleDateString() : '-'}</td>
//               <td>{reminder.start_odometer}</td>
//               <td>{reminder.due_date ? new Date(reminder.due_date).toLocaleDateString() : '-'}</td>
//               <td>{reminder.next_due_km}</td>
//               <td>{reminder.repeat_by_days}</td>
//               <td>{reminder.repeat_by_km}</td>
//               <td>{reminder.notify_before_days}</td>
//               <td>{reminder.notify_before_km}</td>
//               <td>{reminder.completed ? 'Yes' : 'No'}</td>
//               <td>
//                 <Link to={`/reminders/edit/${reminder.id}`}>Edit</Link>
//                 <button onClick={() => reminder.id !== undefined && handleDelete(reminder.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReminderPage;

import { useState, useEffect } from 'react';
import { Reminder, getReminders, deleteReminder } from '../../services/serviceApi';
import { Link } from 'react-router-dom';
import React from 'react';
import '../../styles/ReminderPage.css';

const ReminderPage = () => {
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
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      try {
        await deleteReminder(id);
        setReminders(reminders.filter((reminder) => reminder.id !== id));
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <h2>Your Reminders</h2>
        <Link to="/reminders/add" className="add-reminder-btn">+ Add Reminder</Link>
      </div>
      
      <div className="reminders-table-container">
        <table className="reminders-table">
          <thead>
            <tr>
              <th>License Plate</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>Start Odometer</th>
              <th>Due Date</th>
              <th>Next Due KM</th>
              <th>Repeat Cycle</th>
              <th>Notification Settings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reminders.length === 0 ? (
              <tr>
                <td colSpan={10} className="no-reminders">No reminders found. Click "Add Reminder" to create one.</td>
              </tr>
            ) : (
              reminders.map((reminder) => (
                <tr key={reminder.id}>
                  <td>{reminder.license_plate || '-'}</td>
                  <td>{reminder.description || '-'}</td>
                  <td>{formatDate(reminder.start_date)}</td>
                  <td>{reminder.start_odometer || '-'} km</td>
                  <td>{formatDate(reminder.due_date)}</td>
                  <td>{reminder.next_due_km || '-'} km</td>
                  <td>
                    {reminder.repeat_by_days ? `Every ${reminder.repeat_by_days} days` : ''}
                    {reminder.repeat_by_days && reminder.repeat_by_km ? ', ' : ''}
                    {reminder.repeat_by_km ? `Every ${reminder.repeat_by_km} km` : ''}
                    {!reminder.repeat_by_days && !reminder.repeat_by_km ? 'No repeat' : ''}
                  </td>
                  <td>
                    {reminder.notify_before_days ? `${reminder.notify_before_days} days before` : ''}
                    {reminder.notify_before_days && reminder.notify_before_km ? ', ' : ''}
                    {reminder.notify_before_km ? `${reminder.notify_before_km} km before` : ''}
                    {!reminder.notify_before_days && !reminder.notify_before_km ? 'No notifications' : ''}
                  </td>
                  <td>
                    <span className={`status-badge ${reminder.completed ? 'completed' : 'pending'}`}>
                      {reminder.completed ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <Link to={`/reminders/edit/${reminder.id}`} className="edit-button">
                      <span className="edit-icon">✏️</span>
                    </Link>
                    <button 
                      onClick={() => reminder.id !== undefined && handleDelete(reminder.id)}
                      className="delete-button"
                    >
                      <span className="delete-icon">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReminderPage;