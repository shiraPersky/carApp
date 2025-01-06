import { useState, useEffect } from 'react';
import { Service, getServices, deleteService } from '../../services/serviceApi';
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices() as Service[];
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
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
        {services.map((service) => {
          console.log(service); // Log the service object to check if all fields are available
          return (
            <div key={service.id} className="service-card">
              <Link to={`/services/details/${service.id}`}>
                <h3>{service.service_type}</h3>
                <p>Date: {new Date(service.date).toLocaleDateString()}</p>
                <p>Cost: {service.cost}</p>
                <p>Car ID: {service.car_id}</p>
                <p>Time: {service.time}</p>
                <p>Odometer: {service.odometer}</p>
                <p>Place: {service.place}</p>
                <p>Driver: {service.driver}</p>
                <p>Payment Method: {service.paymentMethod}</p>
                <p>File Attachment: {service.file_attachment}</p>
                <p>Notes: {service.notes}</p>
              </Link>
              <button onClick={() => handleDelete(service.id)}>Delete</button>
            </div>
          );
        })}

        {/* Add New Service Button */}
        <div className="service-card add-button">
          <Link to="/services/add">+</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
