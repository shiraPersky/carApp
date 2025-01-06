import { useState, useEffect } from 'react';
import { Refueling, getRefuels, deleteRefuel } from '../../services/serviceApi';
import { Link } from 'react-router-dom';
import React from 'react';

const RefuelingPage = () => {
  const [refuels, setRefuels] = useState<Refueling[]>([]);

  useEffect(() => {
    const fetchRefuels = async () => {
      const data = await getRefuels() as Refueling[];
      setRefuels(data);
    };
    fetchRefuels();
  }, []);
  
  const handleDelete = async (id: number) => {
    try {
      await deleteRefuel(id);
      setRefuels(refuels.filter((refuel) => refuel.id !== id));
    } catch (error) {
      console.error('Error deleting refuel:', error);
    }
  };

  return (
    <div>
      <h2>Your Refuels</h2>
      <Link to="/refuels/add">Add New Refuel</Link>
      <table>
        <thead>
          <tr>
            <th>Car ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Odometer</th>
            <th>Fuel Type</th>
            <th>Price Per Liter</th>
            <th>Total Cost</th>
            <th>Liters</th>
            <th>Gas Station</th>
            <th>Driver</th>
            <th>File Attachment</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {refuels.map((refuel) => (
            <tr key={refuel.id}>
              <td>{refuel.id}</td>
              <td>{new Date(refuel.date).toLocaleDateString()}</td>
              <td>{refuel.time}</td>
              <td>{refuel.odometer}</td>
              <td>{refuel.kindOfFuel}</td>
              <td>{refuel.pricePerLiter}</td>
              <td>{refuel.totalCost}</td>
              <td>{refuel.liters}</td>
              <td>{refuel.gasStation}</td>
              <td>{refuel.driver}</td>
              <td>{refuel.file_attachment}</td>
              <td>{refuel.notes}</td>
              <td>
                <Link to={`/refuels/edit/${refuel.id}`}>Edit</Link>
                <button onClick={() => handleDelete(refuel.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefuelingPage;
