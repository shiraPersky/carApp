import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateOdometer } from '../../services/serviceApi';

interface OdometerFormProps {
  licensePlate?: string;
  onSubmitSuccess?: () => void;
}

const OdometerForm: React.FC<OdometerFormProps> = ({ licensePlate = '', onSubmitSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    licensePlate: licensePlate,
    odometer: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (licensePlate) {
      setFormData(prev => ({
        ...prev,
        licensePlate: licensePlate
      }));
    }
  }, [licensePlate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Convert odometer to number and ensure it's a valid number
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Odometer Reading
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

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

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