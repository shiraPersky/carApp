// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import CarForm from '../../components/Cars/CarForm'; 
// import { createCar } from '../../services/serviceApi';

// const AddCarPage = () => {
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (data: any) => {
//     console.log('Form data being sent:', data); // Log the data to inspect before submitting
//     try {
//       await createCar(data); // Create a new car entry
//       navigate('/cars'); // Navigate back to the cars list
//     } catch (error) {
//       console.error('Error adding new car:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Car</h2>
//       <CarForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default AddCarPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarForm from '../../components/Cars/CarForm';
import { createCar } from '../../services/serviceApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import '../../styles/AddCarPage.css'; // Import the CSS file

const AddCarPage = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (data: any) => {
    console.log('Form data being sent:', data);
    try {
      await createCar(data);
      navigate('/cars');
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/cars');
  };

  return (
    <div className="add-car-container">
      <div className="page-header">
        <h2 className="page-title">Add New Car</h2>
        <Button 
          className="back-button" 
          onClick={handleCancel}
          startIcon={<ArrowBackIcon />}
        >
          Back to Cars
        </Button>
      </div>
      
      <div className="form-container">
        <CarForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddCarPage;