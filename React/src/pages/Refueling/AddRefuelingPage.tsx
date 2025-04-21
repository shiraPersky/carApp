// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import RefuelingForm from '../../components/Refueling/RefuelingForm';
// import { createRefuel } from '../../services/serviceApi';
// import '../../styles/AddCarPage.css'; // Import the CSS file


// const AddRefuelingPage = () => {
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (data: any) => {
//     console.log('Form data being sent:', data); // Log the data to inspect before submitting
//     try {
//       await createRefuel(data); // Create a new refuel entry
//       navigate('/refuels'); // Navigate back to the refuels list
//     } catch (error) {
//       console.error('Error adding new refuel:', error);
//     }
//   };

//   return (
//     // <div>
//     //   <h2>Add New Refuel</h2>
//     //   <RefuelingForm onSubmit={handleSubmit} />
//     // </div>
//     <div className="add-refueling-container">
//     <h2 className="add-refueling-title">Add Refueling</h2>
//     <RefuelingForm />
//   </div>
//   );
// };

// export default AddRefuelingPage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import RefuelingForm from '../../components/Refueling/RefuelingForm';
// import { createRefuel } from '../../services/serviceApi';
// import '../../styles/AddRefuelingPage.css';

// // Define interface for refueling data
// interface RefuelingFormData {
//   license_plate: string;
//   date: string;
//   time: string;
//   odometer: number;
//   kindOfFuel: string;
//   pricePerLiter: number;
//   totalCost: number;
//   liters: number;
//   gasStation: string;
//   driver: string;
//   notes?: string;
// }

// const AddRefuelingPage: React.FC = () => {
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (data: RefuelingFormData) => {
//     console.log('Form data being sent:', data);
//     try {
//       await createRefuel(data);
//       navigate('/refuels');
//     } catch (error) {
//       console.error('Error adding new refuel:', error);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/refuels');
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h2>Add New Refueling</h2>
//         <button 
//           className="back-button" 
//           onClick={() => navigate('/refuels')}
//         >
//           ← Back to Refuelings
//         </button>
//       </div>
//       <div className="form-card">
//         <RefuelingForm onSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// };

// export default AddRefuelingPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import RefuelingForm from '../../components/Refueling/RefuelingForm';
import { createRefuel } from '../../services/serviceApi';
import '../../styles/AddRefuelingPage.css';

// Define interface for refueling data
interface RefuelingFormData {
  license_plate: string;
  date: string;
  time: string;
  odometer: number;
  kindOfFuel: string;
  pricePerLiter: number;
  totalCost: number;
  liters: number;
  gasStation: string;
  driver: string;
  notes?: string;
}

// Add this interface if it's not exported from RefuelingForm
interface RefuelingFormComponentProps {
  existingRefuel?: Partial<RefuelingFormData>;
  onSubmit?: (data: RefuelingFormData) => void;
  onCancel?: () => void;
}

const AddRefuelingPage: React.FC = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (data: RefuelingFormData) => {
    console.log('Form data being sent:', data);
    try {
      await createRefuel(data);
      navigate('/refuels');
    } catch (error) {
      console.error('Error adding new refuel:', error);
    }
  };

  const handleCancel = () => {
    navigate('/refuels');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Add New Refueling</h2>
      </div>
      <div className="form-card">
        <RefuelingForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default AddRefuelingPage;