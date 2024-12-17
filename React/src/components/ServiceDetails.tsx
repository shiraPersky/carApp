import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';//allows you to access the dynamic URL parameters (ID)
import { getServices } from '../services/serviceApi';//fetches all services from the backend API.
import React from 'react';

const ServiceDetails = () => {
  const [service, setService] = useState<any>(null);//update the service state.
  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {//This function fetches the list of services
      const services = await getServices();
      const serviceDetails = services.find((s: any) => s.id === Number(id));
      setService(serviceDetails);
    };
    fetchService();
  }, [id]);

  //This line checks if the service state is null. If it is, it means the service details haven't been loaded yet, so the component returns a "Loading..." message.
  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h2>Service Details</h2>
      <p>Service Type: {service.service_type}</p>
      {/* Add other fields */}
    </div>
  );
};

export default ServiceDetails;
