import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateOdometer, getCarDetails } from '../../services/serviceApi';

// Define CarDetails interface
export interface CarDetails {
  id: number;
  license_plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  emission_group?: string;
  valid_until: string;
  trim_level?: string;
  last_test: string;
  odometer: number;
  model_type: string;
  model_number: string;
}

// Define OdometerFormProps interface
interface OdometerFormProps {
  licensePlate?: string;
  onSubmitSuccess?: () => void;
}

// Define FormData type for the form fields
interface FormData {
  licensePlate: string;
  odometer: string;
}

const OdometerForm: React.FC<OdometerFormProps> = ({ licensePlate = '', onSubmitSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    licensePlate: licensePlate,
    odometer: '',
  });
  const [currentOdometer, setCurrentOdometer] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch car details based on the license plate
  useEffect(() => {
    const fetchCarDetails = async () => {
      if (licensePlate) {
        try {
          const car = await getCarDetails(licensePlate);
          console.log('Car details response:', car); // Log the response to check the structure

          // Type assertion if the API returns a correctly shaped response
          const typedCar = car as CarDetails;

          // Now we can safely access `odometer` as part of `CarDetails`
          setCurrentOdometer(typedCar.odometer);

          setFormData((prev) => ({
            ...prev,
            licensePlate: typedCar.license_plate, // Set the license plate value
            odometer: '', // Clear the form odometer field
          }));
        } catch (err) {
          setError('Failed to fetch car details');
        }
      }
    };

    fetchCarDetails();
  }, [licensePlate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const odometerValue = Number(formData.odometer);
      if (isNaN(odometerValue)) {
        throw new Error('Invalid odometer value');
      }

      await updateOdometer(formData.licensePlate, odometerValue);

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate('/cars');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update odometer reading');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          License Plate
        </label>
        <input
          type="text"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          required
          disabled={!!licensePlate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Display current odometer reading */}
      {currentOdometer !== null && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Odometer Reading
          </label>
          <p className="text-gray-600">{currentOdometer} km</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          New Odometer Reading
        </label>
        <input
          type="number"
          name="odometer"
          value={formData.odometer}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/cars')}
          className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Odometer'}
        </button>
      </div>
    </form>
  );
};

export default OdometerForm;
