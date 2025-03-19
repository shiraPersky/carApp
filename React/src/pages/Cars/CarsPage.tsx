
// import { useState, useEffect } from 'react';
// import { Car, getCars, deleteCar, updateOdometer } from '../../services/serviceApi';
// import { Link } from 'react-router-dom';
// import React from 'react';
// // import './Cars.css'; // Import the CSS file we just created
// import '../../styles/Cars.css'; // Import the CSS file


// import { FaPlus, FaPencilAlt, FaEraser, FaTachometerAlt, FaEllipsisV } from 'react-icons/fa';

// const CarPage = () => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [newOdometer, setNewOdometer] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchCars = async () => {
//       const data = await getCars() as Car[];
//       setCars(data);
//     };
//     fetchCars();
//   }, []);
  
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteCar(id);
//       setCars(cars.filter((car) => car.id !== id));
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const openOdometerModal = (car: Car) => {
//     setSelectedCar(car);
//     setIsModalOpen(true);
//   };

//   const handleUpdateOdometer = async () => {
//     if (!selectedCar || newOdometer === null) return;

//     try {
//       await updateOdometer(selectedCar.license_plate, newOdometer);
//       setCars(cars.map((car) =>
//         car.id === selectedCar.id ? { ...car, odometer: newOdometer } : car
//       ));
//       setIsModalOpen(false);
//       setSelectedCar(null);
//       setNewOdometer(null);
//     } catch (error) {
//       console.error('Error updating odometer:', error);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="cars-container">
//       <div className="cars-header">
//         <h2 className="cars-title">Your Cars</h2>
//         <Link to="/cars/add" className="add-car-button">
//           <FaPlus className="add-car-icon" /> Add Car
//         </Link>
//       </div>
      
//       <table className="cars-table">
//         <thead>
//           <tr>
//             <th>License Plate</th>
//             <th>Make</th>
//             <th>Model</th>
//             <th>Year</th>
//             <th>Color</th>
//             <th>Valid Until</th>
//             <th>Last Test</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map((car) => (
//             <tr key={car.id}>
//               <td>{car.license_plate}</td>
//               <td>{car.make}</td>
//               <td>{car.model}</td>
//               <td>{car.year}</td>
//               <td>{car.color}</td>
//               <td>{formatDate(car.valid_until)}</td>
//               <td>{formatDate(car.last_test)}</td>
//               <td>
//                 <div className="action-buttons">
//                   <button 
//                     className="action-button odometer-button" 
//                     onClick={() => openOdometerModal(car)}
//                     title="Update Odometer"
//                   >
//                     <FaTachometerAlt />
//                   </button>
//                   <Link 
//                     to={`/cars/edit/${car.id}`} 
//                     className="action-button edit-button"
//                     title="Edit Car"
//                   >
//                     <FaPencilAlt />
//                   </Link>
//                   <button 
//                     className="action-button delete-button" 
//                     onClick={() => handleDelete(car.id)}
//                     title="Delete Car"
//                   >
//                     <FaEraser />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for Updating Odometer */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Update Odometer</h3>
//             </div>
//             <div className="modal-body">
//               <p className="current-value">
//                 Current Odometer for {selectedCar?.make} {selectedCar?.model}: {selectedCar?.odometer} km
//               </p>
//               <input
//                 type="number"
//                 className="input-field"
//                 value={newOdometer || ''}
//                 onChange={(e) => setNewOdometer(Number(e.target.value))}
//                 placeholder="Enter new odometer value"
//               />
//             </div>
//             <div className="modal-footer">
//               <button className="modal-button cancel-button" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button className="modal-button update-button" onClick={handleUpdateOdometer}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarPage;


// import { useState, useEffect } from 'react';
// import { Car, getCars, deleteCar, updateOdometer } from '../../services/serviceApi';
// import { Link, useNavigate } from 'react-router-dom';
// import React from 'react';
// import '../../styles/Cars.css'; // Import the CSS file

// import { FaPlus, FaPencilAlt, FaEraser, FaTachometerAlt, FaCarAlt } from 'react-icons/fa';

// const CarPage = () => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [newOdometer, setNewOdometer] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCars = async () => {
//       const data = await getCars() as Car[];
//       setCars(data);
//     };
//     fetchCars();
//   }, []);
  
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteCar(id);
//       setCars(cars.filter((car) => car.id !== id));
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const openOdometerModal = (car: Car) => {
//     setSelectedCar(car);
//     setIsModalOpen(true);
//   };

//   const handleUpdateOdometer = async () => {
//     if (!selectedCar || newOdometer === null) return;

//     try {
//       await updateOdometer(selectedCar.license_plate, newOdometer);
//       setCars(cars.map((car) =>
//         car.id === selectedCar.id ? { ...car, odometer: newOdometer } : car
//       ));
//       setIsModalOpen(false);
//       setSelectedCar(null);
//       setNewOdometer(null);
//     } catch (error) {
//       console.error('Error updating odometer:', error);
//     }
//   };

//   const viewCarDetails = (carId: number) => {
//     navigate(`/home/${carId}`);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="cars-container">
//       <div className="cars-header">
//         <h2 className="cars-title">Your Cars</h2>
//         <Link to="/cars/add" className="add-car-button">
//           <FaPlus className="add-car-icon" /> Add Car
//         </Link>
//       </div>
      
//       <table className="cars-table">
//         <thead>
//           <tr>
//             <th>License Plate</th>
//             <th>Make</th>
//             <th>Model</th>
//             <th>Year</th>
//             <th>Color</th>
//             <th>Valid Until</th>
//             <th>Last Test</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map((car) => (
//             <tr key={car.id}>
//               <td>{car.license_plate}</td>
//               <td>{car.make}</td>
//               <td>{car.model}</td>
//               <td>{car.year}</td>
//               <td>{car.color}</td>
//               <td>{formatDate(car.valid_until)}</td>
//               <td>{formatDate(car.last_test)}</td>
//               <td>
//                 <div className="action-buttons">
//                   <button 
//                     className="action-button view-button" 
//                     onClick={() => viewCarDetails(car.id)}
//                     title="View Car Details"
//                   >
//                     <FaCarAlt />
//                   </button>
//                   <button 
//                     className="action-button odometer-button" 
//                     onClick={() => openOdometerModal(car)}
//                     title="Update Odometer"
//                   >
//                     <FaTachometerAlt />
//                   </button>
//                   <Link 
//                     to={`/cars/edit/${car.id}`} 
//                     className="action-button edit-button"
//                     title="Edit Car"
//                   >
//                     <FaPencilAlt />
//                   </Link>
//                   <button 
//                     className="action-button delete-button" 
//                     onClick={() => handleDelete(car.id)}
//                     title="Delete Car"
//                   >
//                     <FaEraser />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for Updating Odometer */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Update Odometer</h3>
//             </div>
//             <div className="modal-body">
//               <p className="current-value">
//                 Current Odometer for {selectedCar?.make} {selectedCar?.model}: {selectedCar?.odometer} km
//               </p>
//               <input
//                 type="number"
//                 className="input-field"
//                 value={newOdometer || ''}
//                 onChange={(e) => setNewOdometer(Number(e.target.value))}
//                 placeholder="Enter new odometer value"
//               />
//             </div>
//             <div className="modal-footer">
//               <button className="modal-button cancel-button" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button className="modal-button update-button" onClick={handleUpdateOdometer}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarPage;

// import { useState, useEffect } from 'react';
// import { Car, getCars, deleteCar, updateOdometer } from '../../services/serviceApi';
// import { Link, useNavigate } from 'react-router-dom';
// import React from 'react';
// import '../../styles/Cars.css';

// import { FaPlus, FaPencilAlt, FaEraser, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

// const CarPage = () => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [newOdometer, setNewOdometer] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCars = async () => {
//       const data = await getCars() as Car[];
//       setCars(data);
//     };
//     fetchCars();
//   }, []);
  
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteCar(id);
//       setCars(cars.filter((car) => car.id !== id));
//     } catch (error) {
//       console.error('Error deleting car:', error);
//     }
//   };

//   const openOdometerModal = (car: Car) => {
//     setSelectedCar(car);
//     setIsModalOpen(true);
//   };

//   const handleUpdateOdometer = async () => {
//     if (!selectedCar || newOdometer === null) return;

//     try {
//       await updateOdometer(selectedCar.license_plate, newOdometer);
//       setCars(cars.map((car) =>
//         car.id === selectedCar.id ? { ...car, odometer: newOdometer } : car
//       ));
//       setIsModalOpen(false);
//       setSelectedCar(null);
//       setNewOdometer(null);
//     } catch (error) {
//       console.error('Error updating odometer:', error);
//     }
//   };

//   const viewCarDetails = (carId: number) => {
//     navigate(`/home/${carId}`);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="cars-container">
//       <div className="cars-header">
//         <h2 className="cars-title">Choose Your Car</h2>
//         <div className="header-buttons">
//           <Link to="/cars/add" className="add-car-button">
//             <FaPlus className="add-car-icon" /> Add Car
//           </Link>
//           <Link to="/login" className="back-to-login-button">
//             <FaSignOutAlt className="login-icon" /> Back to Login
//           </Link>
//         </div>
//       </div>
      
//       <table className="cars-table">
//         <thead>
//           <tr>
//             <th>License Plate</th>
//             <th>Make</th>
//             <th>Model</th>
//             <th>Year</th>
//             <th>Color</th>
//             <th>Valid Until</th>
//             <th>Last Test</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map((car) => (
//             <tr 
//               key={car.id}
//               className="car-row"
//               onClick={() => viewCarDetails(car.id)}
//             >
//               <td>{car.license_plate}</td>
//               <td>{car.make}</td>
//               <td>{car.model}</td>
//               <td>{car.year}</td>
//               <td>{car.color}</td>
//               <td>{formatDate(car.valid_until)}</td>
//               <td>{formatDate(car.last_test)}</td>
//               <td onClick={(e) => e.stopPropagation()}>
//                 <div className="action-buttons">
//                   <button 
//                     className="action-button odometer-button" 
//                     onClick={() => openOdometerModal(car)}
//                     title="Update Odometer"
//                   >
//                     <FaTachometerAlt />
//                   </button>
//                   <Link 
//                     to={`/cars/edit/${car.id}`} 
//                     className="action-button edit-button"
//                     title="Edit Car"
//                   >
//                     <FaPencilAlt />
//                   </Link>
//                   <button 
//                     className="action-button delete-button" 
//                     onClick={() => handleDelete(car.id)}
//                     title="Delete Car"
//                   >
//                     <FaEraser />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for Updating Odometer */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Update Odometer</h3>
//             </div>
//             <div className="modal-body">
//               <p className="current-value">
//                 Current Odometer for {selectedCar?.make} {selectedCar?.model}: {selectedCar?.odometer} km
//               </p>
//               <input
//                 type="number"
//                 className="input-field"
//                 value={newOdometer || ''}
//                 onChange={(e) => setNewOdometer(Number(e.target.value))}
//                 placeholder="Enter new odometer value"
//               />
//             </div>
//             <div className="modal-footer">
//               <button className="modal-button cancel-button" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button className="modal-button update-button" onClick={handleUpdateOdometer}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarPage;

// import { useState, useEffect } from 'react';
// import { Car, getCars, updateOdometer } from '../../services/serviceApi';
// import { Link, useNavigate } from 'react-router-dom';
// import React from 'react';
// import '../../styles/Cars.css';

// import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

// const CarPage = () => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [newOdometer, setNewOdometer] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCars = async () => {
//       const data = await getCars() as Car[];
//       setCars(data);
//     };
//     fetchCars();
//   }, []);

//   const openOdometerModal = (car: Car, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setSelectedCar(car);
//     setIsModalOpen(true);
//   };

//   const handleUpdateOdometer = async () => {
//     if (!selectedCar || newOdometer === null) return;

//     try {
//       await updateOdometer(selectedCar.license_plate, newOdometer);
//       setCars(cars.map((car) =>
//         car.id === selectedCar.id ? { ...car, odometer: newOdometer } : car
//       ));
//       setIsModalOpen(false);
//       setSelectedCar(null);
//       setNewOdometer(null);
//     } catch (error) {
//       console.error('Error updating odometer:', error);
//     }
//   };

//   const viewCarDetails = (carId: number) => {
//     navigate(`/home/${carId}`);
//   };

//   const goToLogin = () => {
//     navigate('/login');
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="cars-container">
//       <div className="cars-header">
//         <h2 className="cars-title">Choose Your Car</h2>
//         <div className="header-buttons">
//           <Link to="/cars/add" className="add-car-button">
//             <FaPlus className="add-car-icon" /> Add Car
//           </Link>
//           <button onClick={goToLogin} className="back-to-login-button">
//             <FaSignOutAlt className="login-icon" /> Back to Login
//           </button>
//         </div>
//       </div>
      
//       <table className="cars-table">
//         <thead>
//           <tr>
//             <th>License Plate</th>
//             <th>Make</th>
//             <th>Model</th>
//             <th>Year</th>
//             <th>Color</th>
//             <th>Valid Until</th>
//             <th>Last Test</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map((car) => (
//             <tr 
//               key={car.id}
//               className="car-row"
//               onClick={() => viewCarDetails(car.id)}
//             >
//               <td>{car.license_plate}</td>
//               <td>{car.make}</td>
//               <td>{car.model}</td>
//               <td>{car.year}</td>
//               <td>{car.color}</td>
//               <td>{formatDate(car.valid_until)}</td>
//               <td>{formatDate(car.last_test)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for Updating Odometer */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Update Odometer</h3>
//             </div>
//             <div className="modal-body">
//               <p className="current-value">
//                 Current Odometer for {selectedCar?.make} {selectedCar?.model}: {selectedCar?.odometer} km
//               </p>
//               <input
//                 type="number"
//                 className="input-field"
//                 value={newOdometer || ''}
//                 onChange={(e) => setNewOdometer(Number(e.target.value))}
//                 placeholder="Enter new odometer value"
//               />
//             </div>
//             <div className="modal-footer">
//               <button className="modal-button cancel-button" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//               <button className="modal-button update-button" onClick={handleUpdateOdometer}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarPage;

import { useState, useEffect } from 'react';
import { Car, getCars, updateOdometer } from '../../services/serviceApi';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import '../../styles/Cars.css';

import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

const CarPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [newOdometer, setNewOdometer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars() as Car[];
      setCars(data);
    };
    fetchCars();
  }, []);

  const handleUpdateOdometer = async () => {
    if (!selectedCar || newOdometer === null) return;

    try {
      await updateOdometer(selectedCar.license_plate, newOdometer);
      setCars(cars.map((car) =>
        car.id === selectedCar.id ? { ...car, odometer: newOdometer } : car
      ));
      setIsModalOpen(false);
      setSelectedCar(null);
      setNewOdometer(null);
    } catch (error) {
      console.error('Error updating odometer:', error);
    }
  };

  const viewCarDetails = (carId: number) => {
    navigate(`/home/${carId}`);
  };

  const goToLogin = () => {
    window.location.href = '/login';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="cars-container">
      <div className="cars-header">
        <h2 className="cars-title">Choose Your Car</h2>
        <div className="header-buttons">
          <Link to="/cars/add" className="add-car-button">
            <FaPlus className="add-car-icon" /> Add Car
          </Link>
          <button onClick={goToLogin} className="back-to-login-button">
            <FaSignOutAlt className="login-icon" /> Back to Login
          </button>
        </div>
      </div>
      
      <table className="cars-table">
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Valid Until</th>
            <th>Last Test</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr 
              key={car.id}
              className="car-row"
              onClick={() => viewCarDetails(car.id)}
            >
              <td>{car.license_plate}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{formatDate(car.valid_until)}</td>
              <td>{formatDate(car.last_test)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Updating Odometer */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Update Odometer</h3>
            </div>
            <div className="modal-body">
              <p className="current-value">
                Current Odometer for {selectedCar?.make} {selectedCar?.model}: {selectedCar?.odometer} km
              </p>
              <input
                type="number"
                className="input-field"
                value={newOdometer || ''}
                onChange={(e) => setNewOdometer(Number(e.target.value))}
                placeholder="Enter new odometer value"
              />
            </div>
            <div className="modal-footer">
              <button className="modal-button cancel-button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="modal-button update-button" onClick={handleUpdateOdometer}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarPage;