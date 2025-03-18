import { useState, useEffect } from 'react';
import { Car, getCars } from '../services/serviceApi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaCarAlt, FaWrench, FaGasPump, FaChartLine, FaBell } from 'react-icons/fa';
import '../styles/HomePage.css'; // Import the CSS file
import React from 'react';

const HomePage = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const { carId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars() as Car[];
      setCars(data);
      
      if (carId) {
        const car = data.find(c => c.id === parseInt(carId));
        if (car) {
          setSelectedCar(car);
        } else if (data.length > 0) {
          // If no car is specified or specified car not found, select the first car
          setSelectedCar(data[0]);
        }
      } else if (data.length > 0) {
        // If no car ID is provided, select the first car
        setSelectedCar(data[0]);
      }
    };
    
    fetchCars();
  }, [carId]);

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(event.target.value);
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      navigate(`/home/${carId}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="home-container">
      <div className="car-selection">
        <label htmlFor="car-select">Select Car:</label>
        <select 
          id="car-select" 
          value={selectedCar?.id || ''} 
          onChange={handleCarChange}
        >
          {cars.map(car => (
            <option key={car.id} value={car.id}>
              {car.license_plate} - {car.make} {car.model}
            </option>
          ))}
        </select>
      </div>

      {selectedCar && (
        <div className="car-details-card">
          <h2>{selectedCar.make} {selectedCar.model}</h2>
          <div className="car-info-grid">
            <div className="car-info-item">
              <span className="info-label">License Plate:</span>
              <span className="info-value">{selectedCar.license_plate}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Year:</span>
              <span className="info-value">{selectedCar.year}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Color:</span>
              <span className="info-value">{selectedCar.color}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Odometer:</span>
              <span className="info-value">{selectedCar.odometer} km</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Valid Until:</span>
              <span className="info-value">{formatDate(selectedCar.valid_until)}</span>
            </div>
            <div className="car-info-item">
              <span className="info-label">Last Test:</span>
              <span className="info-value">{formatDate(selectedCar.last_test)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="navigation-tiles">
        <Link to="/reminders" className="nav-tile">
          <FaBell className="nav-icon"/>
          <span className="nav-label">Reminders</span>
        </Link>
        <Link to="/services" className="nav-tile">
          <FaWrench className="nav-icon"/>
          <span className="nav-label">Services</span>
        </Link>
        <Link to="/refuels" className="nav-tile">
          <FaGasPump className="nav-icon"/>
          <span className="nav-label">Refuel</span>
        </Link>
        <Link to="/fuel-statistics" className="nav-tile">
          <FaChartLine className="nav-icon"/>
          <span className="nav-label">Fuel Statistics</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;