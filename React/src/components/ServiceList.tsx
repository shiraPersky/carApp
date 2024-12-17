import { Link } from 'react-router-dom'; // For navigation
import { useState, useEffect } from 'react'; // For state and side-effects
import { getServices } from '../services/serviceApi'; // API to fetch services
import React from 'react';

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]); // State to hold the list of services

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices(); // Fetch services
      setServices(data); // Set services into state
    };
    fetchServices();
  }, []);

    function handleDelete(id: any): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div>
      <h2>Your Services</h2>
      <Link to="/services/add">Add New Service</Link>
      <table>
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.service_type}</td>
              <td>{new Date(service.date).toLocaleDateString()}</td>
              <td>{service.cost}</td>
              <td>
                <Link to={`/services/edit/${service.id}`}>Edit</Link>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
