import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteService } from '../services/serviceApi';
import React from 'react';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/services'); // Fetch all services
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Fetch all services once on component mount

  useEffect(() => {
    // Once services are fetched, find the service that matches the ID
    if (id && services.length > 0) {
      const foundService = services.find((service) => service.id === Number(id));
      setService(foundService || null);
    }
  }, [id, services])

  // Handle delete operation
  const handleDelete = async () => {
    try {
      await deleteService(Number(id)); // Call deleteService function
      navigate('/services');
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h2>Service Details</h2>
      <p>Service Type: {service.service_type}</p>
      <p>Date: {new Date(service.date).toLocaleDateString()}</p>
      <p>Odometer: {service.odometer}</p>
      <p>Place: {service.place}</p>
      <p>Driver: {service.driver}</p>
      <p>Payment Method: {service.payment_method}</p>
      <p>Cost: {service.cost}</p>
      <p>Notes: {service.notes}</p>

      <div>
        <Link to={`/services/edit/${service.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ServiceDetails;
