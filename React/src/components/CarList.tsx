import { useState, useEffect } from 'react';
import { Car, getCars, deleteCar } from '../services/serviceApi';
import React from 'react';
import { Link } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars() as Car[];
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <h2>Your Cars</h2>
      <div className="car-grid">
        {/* Grid for cars */}
        {cars.map((car) => {
          console.log(car); // Log the car object to check if all fields are available
          return (
            <div key={car.id} className="car-card">
              <Link to={`/cars/details/${car.id}`}>
                <h3>{car.make} {car.model} ({car.year})</h3>
                <p>License Plate: {car.license_plate}</p>
                <p>Color: {car.color}</p>
                <p>Emission Group: {car.emission_group}</p>
                <p>Last Test: {new Date(car.last_test).toLocaleDateString()}</p>
                <p>Valid Until: {new Date(car.valid_until).toLocaleDateString()}</p>
              </Link>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </div>
          );
        })}

        {/* Add New Car Button */}
        <div className="car-card add-button">
          <Link to="/cars/add">+</Link>
        </div>
      </div>
    </div>
  );
};

export default CarList;
