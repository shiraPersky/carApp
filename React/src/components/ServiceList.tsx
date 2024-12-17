import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getServices, deleteService } from '../services/serviceApi';
import React from 'react';

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteService(id);
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div>
      <h2>Your Services</h2>
      <div className="service-grid">
        {/* Grid for services */}
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <Link to={`/services/details/${service.id}`}>
              <h3>{service.service_type}</h3>
              <p>Date: {new Date(service.date).toLocaleDateString()}</p>
              <p>Cost: {service.cost}</p>
            </Link>
          </div>
        ))}
        {/* Add New Service Button */}
        <div className="service-card add-button">
          <Link to="/services/add">+</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
