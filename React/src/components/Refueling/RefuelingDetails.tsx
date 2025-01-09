import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteRefuel } from '../../services/serviceApi';
import React from 'react';

const RefuelingDetails  = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [refuel, setRefuel] = useState<any>(null);
  const [refuels, setRefuels] = useState<any[]>([]);

  useEffect(() => {
    const fetchRefuels  = async () => {
      try {
        const response = await fetch('http://localhost:3000/refuels'); // Fetch all services
        if (!response.ok) {
          throw new Error('Failed to fetch refuels');
        }
        const data = await response.json();
        setRefuels(data);
      } catch (error) {
        console.error('Error fetching refuel:', error);
      }
    };

    fetchRefuels();
  }, []); // Fetch all refuels once on component mount

  useEffect(() => {
    // Once refuels are fetched, find the refuel that matches the ID
    if (id && refuels.length > 0) {
      const foundRefuel = refuels.find((refuel) => refuel.id === Number(id));
      setRefuel(foundRefuel || null);
    }
  }, [id, refuels]);
  
  // Handle delete operation
  const handleDelete = async () => {
    try {
      await deleteRefuel(Number(id)); // Call deleteRefuel function
      navigate('/refuels');
    } catch (error) {
      console.error('Error deleting refuel:', error);
    }
  };

  if (!refuel) return <div>Loading...</div>;

  return (
    <div>
      <h2>Refueling Details</h2>
      <p>License Plate: {refuel.license_plate}</p>
      <p>Date: {new Date(refuel.date).toLocaleDateString()}</p>
      <p>Time: {new Date(refuel.time).toLocaleTimeString()}</p>
      <p>Odometer: {refuel.odometer}</p>
      <p>Kind of Fuel: {refuel.kindOfFuel}</p>
      <p>Price per Liter: {refuel.pricePerLiter}</p>
      <p>Total Cost: {refuel.totalCost}</p>
      <p>Liters: {refuel.liters}</p>
      <p>Gas Station: {refuel.gasStation}</p>
      <p>Driver: {refuel.driver}</p>
      <p>Notes: {refuel.notes}</p>

      <div>
        <Link to={`/refuels/edit/${refuel.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default RefuelingDetails;