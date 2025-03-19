// import { useState, useEffect } from 'react';
// import { Service ,getServices, deleteService } from '../../services/serviceApi';
// import { Link } from 'react-router-dom';
// import React from 'react';

// const ServicesPage = () => {
//   const [services, setServices] = useState<Service[]>([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       const data = await getServices() as Service[];
//       setServices(data);
//     };
//     fetchServices();
//   }, []);
  
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteService(id);
//       setServices(services.filter((service) => service.id !== id));
//     } catch (error) {
//       console.error('Error deleting service:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Your Services</h2>
//       <Link to="/services/add">Add New Service</Link>
//       <table>
//         <thead>
//           <tr>
//             <th>License Plate</th>
//             <th>Service Type</th>
//             <th>Date</th>
//             <th>Cost</th>
//             <th>Odometer</th>
//             <th>Place</th>
//             <th>Driver</th>
//             <th>Payment Method</th>
//             <th>File Attachment</th>
//             <th>Notes</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {services.map((service) => (
//             <tr key={service.id}>
//               <td>{service.service_type}</td>
//               <td>{service.license_plate}</td>
//               <td>{new Date(service.date).toLocaleDateString()}</td>
//               <td>{service.cost}</td>
//               <td>{service.odometer}</td>
//               <td>{service.place}</td>
//               <td>{service.driver}</td>
//               <td>{service.paymentMethod}</td>
//               <td>{service.file_attachment}</td>
//               <td>{service.notes}</td>
//               <td>
//                 <Link to={`/services/edit/${service.id}`}>Edit</Link>
//                 <button onClick={() => handleDelete(service.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ServicesPage;



import { useState, useEffect } from 'react';
import { Service, getServices, deleteService } from '../../services/serviceApi';
import { Link } from 'react-router-dom';
import React from 'react';
import '../../styles/ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices() as Service[];
      setServices(data);
    };
    fetchServices();
  }, []);
  
  const handleDelete = async (id: number) => {
    if(window.confirm("Are you sure you want to delete this service record?")) {
      try {
        await deleteService(id);
        setServices(services.filter((service) => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="services-container">
      <div className="header-container">
        <h2 className="page-title">Your Services</h2>
        <Link to="/services/add" className="add-button">
          + Add Service
        </Link>
      </div>
      
      <div className="table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>License Plate</th>
              <th>Service Type</th>
              <th>Date</th>
              <th>Odometer</th>
              <th>Cost</th>
              <th>Place</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.license_plate}</td>
                <td>{service.service_type}</td>
                <td>{new Date(service.date).toLocaleDateString()}</td>
                <td>{service.odometer} km</td>
                <td>₪{service.cost}</td>
                <td>{service.place}</td>
                <td>{service.paymentMethod}</td>
                <td className="actions-cell">
                  <Link to={`/services/edit/${service.id}`} className="edit-button" title="Edit">
                    <span className="icon">✏️</span>
                  </Link>
                  <button onClick={() => handleDelete(service.id)} className="delete-button" title="Delete">
                    <span className="icon">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesPage;
