// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ServiceForm from '../../components/Service/ServiceForm';
// import { createService } from '../../services/serviceApi';

// const AddServicePage = () => {
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (data: any) => {
//     console.log('Form data being sent:', data); // Log the data to inspect before submitting
//     try {
//       await createService(data);
//       navigate('/services'); // Navigate back to the services list
//     } catch (error) {
//       console.error('Error adding new service:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Service</h2>
//       <ServiceForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default AddServicePage;






// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ServiceForm from '../../components/Service/ServiceForm';
// import { createService } from '../../services/serviceApi';
// import '../../styles/AddServicePage.css';

// const AddServicePage = () => {
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (data) => {
//     try {
//       await createService(data);
//       navigate('/services'); // Navigate back to the services list
//     } catch (error) {
//       console.error('Error adding new service:', error);
//     }
//   };

//   // Handle cancel button click
//   const handleCancel = () => {
//     navigate('/services');
//   };

//   return (
//     <div className="add-service-container">
//       <h2 className="page-title">Add New Service</h2>
//       <ServiceForm 
//         onSubmit={handleSubmit} existingService={undefined}      />
//     </div>
//   );
// };

// export default AddServicePage;







// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ServiceForm from '../../components/Service/ServiceForm';
// import { createService, getCars } from '../../services/serviceApi';
// import { Car } from '../../services/serviceApi'; // Import the Car interface
// import '../../styles/AddServicePage.css';

// const AddServicePage = () => {
//   const [cars, setCars] = useState<Car[]>([]); // Specify the type of cars as an array of Car objects
//   const navigate = useNavigate();

//   // Fetch cars when the component mounts
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         // Explicitly type the response as Car[]
//         const data: Car[] = await getCars();
//         setCars(data); // Now TypeScript knows data is of type Car[]
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       }
//     };
//     fetchCars();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (data: any) => {
//     // Find the car with the matching license plate
//     const matchedCar = cars.find(car => car.license_plate === data.license_plate);
//     if (!matchedCar) {
//       console.error("No car found with license plate:", data.license_plate);
//       return;
//     }

//     // Attach the car_id to the service data
//     const dataWithCarId = {
//       ...data,
//       car_id: matchedCar.id, // Add car_id to the data object
//     };

//     try {
//       await createService(dataWithCarId);
//       navigate('/services'); // Navigate back to the services list after successful creation
//     } catch (error) {
//       console.error('Error adding new service:', error);
//     }
//   };

//   // Handle cancel button click
//   const handleCancel = () => {
//     navigate('/services');
//   };

//   return (
//     <div className="add-service-container">
//       <h2 className="page-title">Add New Service</h2>
//       <ServiceForm onSubmit={handleSubmit} existingService={undefined} />
//     </div>
//   );
// };

// export default AddServicePage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/Service/ServiceForm';
import { createService, getCars } from '../../services/serviceApi';
import { Car } from '../../services/serviceApi';
import '../../styles/AddServicePage.css';

const AddServicePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  // Fetch cars when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data: Car[] = await getCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to fetch cars. Please try again later.');
      }
    };
    fetchCars();
  }, []);

  // Handle form submission
  const handleSubmit = async (data: any) => {
    const matchedCar = cars.find(car => car.license_plate === data.license_plate);

    if (!matchedCar) {
      const message = `No car found with license plate: ${data.license_plate}`;
      console.error(message);
      setError(message); // Show error to user
      return;
    }

    setError(null); // Clear error if matched

    const dataWithCarId = {
      ...data,
      car_id: matchedCar.id,
    };

    try {
      await createService(dataWithCarId);
      navigate('/services'); // Navigate after success
    } catch (error: any) {
      console.error('Error adding new service:', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Failed to add service. Please try again.';
      setError(errorMessage);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/services');
  };

  return (
    <div className="add-service-container">
      <h2 className="page-title">Add New Service</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <ServiceForm onSubmit={handleSubmit} existingService={undefined} />
    </div>
  );
};

export default AddServicePage;
