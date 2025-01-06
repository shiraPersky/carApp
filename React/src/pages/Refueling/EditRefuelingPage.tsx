import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RefuelingForm from '../../components/Refueling/RefuelingForm';
import { updateRefuel } from '../../services/serviceApi';

const EditRefuelingPage = () => {
  const { id } = useParams(); // Get the refuel ID from the URL
  const navigate = useNavigate();
  const [refuel, setRefuel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refuels, setRefuels] = useState<any[]>([]);

  // Fetch all refuels and then find the specific one by ID
  useEffect(() => {
    const fetchRefuels = async () => {
      try {
        const response = await fetch('http://localhost:3000/refuels'); // Fetch all refuels
        if (!response.ok) {
          throw new Error('Failed to fetch refuels');
        }
        const data = await response.json();
        setRefuels(data);
      } catch (error) {
        console.error('Error fetching refuels:', error);
      }
    };

    fetchRefuels();
  }, []); // Fetch all refuels once on component mount

  // Once refuels are fetched, find the specific refuel by ID
  useEffect(() => {
    if (id && refuels.length > 0) {
      const foundRefuel = refuels.find((refuel) => refuel.id === Number(id));
      setRefuel(foundRefuel || null);
      setLoading(false); // Stop loading when the refuel is found
    }
  }, [id, refuels]); // Only run when refuels or id change

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log("Submitting update with data:", data); // Tests-Log data being sent to API
    try {
      const { id, ...refuelData } = data;  // Remove id from data if it's part of the form data
      await updateRefuel(Number(id), data); // Update the refuel by ID
      navigate('/refuels'); // Navigate back to the refuels list
    } catch (error) {
      console.error('Error updating refuel:', error);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div>
      <h2>Edit Refuel</h2>
      <RefuelingForm existingRefuel={refuel} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditRefuelingPage;
