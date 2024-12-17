import React, { useState, useEffect } from 'react';
import { getAllServices, createService } from '../services/serviceApi';
import { ServiceDto } from '../services/serviceDto';

const ServiceComponent = () => {
  const [services, setServices] = useState<ServiceDto[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getAllServices();
      setServices(data);
    };
    
    fetchServices();
  }, []);

  const addService = async () => {
    const newService: ServiceDto = {
      car_id: 1,
      date: '2024-12-16',
      time: '10:00 AM',
      odometer: 15000,
      service_type: 'Oil Change',
      place: 'Service Center',
      driver: 'John Doe',
      paymentMethod: 'Credit Card',
      cost: 100,
    };

    const createdService = await createService(newService);
    setServices([...services, createdService]);
  };

  return (
    <div>
      <h1>Car Services</h1>
      <button onClick={addService}>Add Service</button>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.service_type} - {service.cost} USD</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceComponent;
