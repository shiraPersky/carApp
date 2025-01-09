import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import OdometerForm from '../../components/Cars/OdometerForm';

const OdometerUpdatePage: React.FC = () => {
  const { licensePlate } = useParams<{ licensePlate: string }>();

  if (!licensePlate) {
    return <Navigate to="/cars" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Odometer Reading</h1>
      <p className="text-gray-600 mb-4">
        Updating odometer for vehicle: {licensePlate}
      </p>
      <OdometerForm licensePlate={licensePlate} />
    </div>
  );
};

export default OdometerUpdatePage;