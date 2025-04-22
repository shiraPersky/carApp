// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ServiceForm from '../../components/Service/ServiceForm';
// import { updateService } from '../../services/serviceApi';

// const EditServicePage = () => {
//   const { id } = useParams(); // Get the service ID from the URL
//   const navigate = useNavigate();
//   const [service, setService] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [services, setServices] = useState<any[]>([]);

//   // Fetch all services and then find the specific one by ID
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/services'); // Fetch all services
//         if (!response.ok) {
//           throw new Error('Failed to fetch services');
//         }
//         const data = await response.json();
//         setServices(data);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };

//     fetchServices();
//   }, []); // Fetch all services once on component mount

//   // Once services are fetched, find the specific service by ID
//   useEffect(() => {
//     if (id && services.length > 0) {
//       const foundService = services.find((service) => service.id === Number(id));
//       setService(foundService || null);
//       setLoading(false); // Stop loading when the service is found
//     }
//   }, [id, services]); // Only run when services or id change

//   // Handle form submission
//   const handleSubmit = async (data: any) => {
//     try {
//       await updateService(Number(id), data);
//       navigate('/services'); // Navigate back to the services list
//     } catch (error) {
//       console.error('Error updating service:', error);
//     }
//   };

//   if (loading) return <div>Loading...</div>; // Show loading while fetching data

//   return (
//     <div>
//       <h2>Edit Service</h2>
//       <ServiceForm existingService={service} onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default EditServicePage;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/Service/ServiceForm';
import { updateService } from '../../services/serviceApi';

const EditServicePage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); // New error state

  // Fetch all services and then find the specific one by ID
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/services'); // Fetch all services
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Fetch all services once on component mount

  // Once services are fetched, find the specific service by ID
  useEffect(() => {
    if (id && services.length > 0) {
      const foundService = services.find((service) => service.id === Number(id));
      setService(foundService || null);
      setLoading(false); // Stop loading when the service is found
    }
  }, [id, services]); // Only run when services or id change

  // Handle form submission
  // const handleSubmit = async (data: any) => {
  //   try {
  //     await updateService(Number(id), data); // Call update service function
  //     navigate('/services'); // Navigate back to the services list
  //   } catch (error) {
  //     console.error('Error updating service:', error); // Log the error
  
  //     // Check if the error has the "does not exist" message
  //     if (error.message.includes("does not exist")) {
  //       alert(error.message); // You can replace this with a better UI notification
  //     } else {
  //       alert('An unexpected error occurred while updating the service');
  //     }
  //   }
  // };
  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      await updateService(Number(id), data);
      navigate('/services');
    } catch (error: any) {
      console.error('Error updating service:', error);
  
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An unexpected error occurred while updating the service.';
  
      setError(errorMessage);
    }
  };
  
  
  

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div>
      <h2>Edit Service</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error */}
      <ServiceForm existingService={service} onSubmit={handleSubmit} />
    </div>
  );
  
  
};

export default EditServicePage;
