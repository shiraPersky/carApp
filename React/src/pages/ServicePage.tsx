import { useState, useEffect } from 'react';//useState-Holds the data of services,useEffect-Fetches data from the backend when the
import { getServices, deleteService } from '../services/serviceApi';//responsible for interacting with the backend to fetch services and delete a service.
import { Link } from 'react-router-dom';// to create links that navigate to other pages without reloading the page.
import React from 'react';

const ServicesPage = () => {
    //services-the state variable that will hold the list of services fetched from the backend
    //setService- This is the setter function used to update the services state.
    //The initial value is an empty array ([]), which will later hold the list of services.
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {//used to fetch data when the page is loaded
    const fetchServices = async () => {//calls getServices() to fetch the services from the backend.
      const data = await getServices();
      setServices(data);//updates the state with the received list of services.
    };
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {//handles the deletion of a service when the user clicks the delete button.
    try {
      await deleteService(id);//makes an API call to delete the service 
      //If successful, it filters the current services state to remove the deleted service (based on id):
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

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

export default ServicesPage;
