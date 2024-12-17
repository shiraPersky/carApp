import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceById, deleteService } from '../services/serviceApi';
import React from 'react';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    const fetchService = async () => {
      const data = await getServiceById(Number(id));
      setService(data);
    };
    fetchService();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteService(Number(id));
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
      <p>Reminder: {service.reminder}</p>

      <div>
        <Link to={`/services/edit/${service.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ServiceDetails;
