import { useState, useEffect } from 'react';
import { Car, getCars, deleteCar } from '../../services/serviceApi';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making the CSV upload request

interface ImportResponse {
  data: Car[]; // Assuming the backend returns an array of cars in a `data` property
}

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);  // Store files as an array

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(Array.from(event.target.files));  // Store all selected files
    }
  };

  const handleImport = async () => {
    if (!selectedFile || selectedFile.length === 0) {
      alert('Please select a file to import.');
      return;
    }

    const formData = new FormData();

    selectedFile.forEach(file => {
      formData.append('files', file);  // Append each file to the form data
    });

    try {
      const response = await axios.post<ImportResponse>('/csv/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Cars imported successfully!');
      setCars((prevCars) => [...prevCars, ...response.data.data]); // Update the cars list
    } catch (error) {
      console.error('Error importing cars:', error);
      alert('Failed to import cars.');
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

        {/*Add New Car Button*/}
        <div className="car-card add-button">
          <Link to="/cars/add">+</Link>
        </div>
      </div>

      {/* File Upload and Import Button */}
      <div className="import-section">
        <h3>Import Cars</h3>
        <input type="file" accept=".csv" onChange={handleFileChange} multiple />
        <button onClick={handleImport}>Import</button>
      </div>
    </div>
  );
};

export default CarList;
