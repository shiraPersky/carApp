import { useState, useEffect } from 'react';
import { Refueling, getRefuels, deleteRefuel } from '../../services/serviceApi';
import React from 'react';
import { Link } from 'react-router-dom';

const RefuelingList = () => {
  const [refuels, setRefuels] = useState<Refueling[]>([]);

  useEffect(() => {
    const fetchRefuels = async () => {
      try {
        const data = await getRefuels() as Refueling[];
        setRefuels(data);
      } catch (error) {
        console.error('Error fetching refuels:', error);
      }
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
      <div className="refuel-grid">
        {/* Grid for refuels */}
        {refuels.map((refuel) => {
          console.log(refuel); // Log the refuel object to check if all fields are available
          return (
            <div key={refuel.id} className="refuel-card">
              <Link to={`/refuels/details/${refuel.id}`}>
                <h3>{refuel.kindOfFuel} Refuel</h3>
                <p>License Plate: {refuel.license_plate}</p> {/* Display License Plate */}
                <p>Date: {new Date(refuel.date).toLocaleDateString()}</p>
                <p>Odometer: {refuel.odometer}</p>
                <p>Liters: {refuel.liters}</p>
                <p>Price per Liter: {refuel.pricePerLiter}</p>
                <p>Total Cost: {refuel.totalCost}</p>
                <p>Gas Station: {refuel.gasStation}</p>
                <p>Driver: {refuel.driver}</p>
                <p>Notes: {refuel.notes}</p>
              </Link>
              <button onClick={() => handleDelete(refuel.id)}>Delete</button>
            </div>
          );
        })}

        {/* Add New Refuel Button */}
        <div className="refuel-card add-button">
          <Link to="/refuels/add">+</Link>
        </div>
      </div>
    </div>
  );
};

export default RefuelingList;
