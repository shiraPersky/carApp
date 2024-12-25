import { useState, useEffect } from 'react';
import { Car, getCars, deleteCar } from '../services/serviceApi';
import { Link } from 'react-router-dom';
import React from 'react';

const CarPage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars() as Car[]; // Fetching the list of cars
      setCars(data);
    };
    fetchCars();
  }, []);
  
  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id); // Delete the car by ID
      setCars(cars.filter((car) => car.id !== id)); // Remove the deleted car from the state
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <h2>Your Cars</h2>
      <Link to="/cars/add">Add New Car</Link>
      <table>
        <thead>
          <tr>
            <th>Car ID</th>
            <th>License Plate</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Emission Group</th>
            <th>Valid Until</th>
            <th>Trim Level</th>
            <th>Last Test</th>
            <th>Model Type</th>
            <th>Model Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.license_plate}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{car.emission_group}</td>
              <td>{new Date(car.valid_until).toLocaleDateString()}</td>
              <td>{car.trim_level}</td>
              <td>{new Date(car.last_test).toLocaleDateString()}</td>
              <td>{car.model_type}</td>
              <td>{car.model_number}</td>
              <td>
                <Link to={`/cars/edit/${car.id}`}>Edit</Link> {/* Link to the edit page */}
                <button onClick={() => handleDelete(car.id)}>Delete</button> {/* Delete car */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarPage;
