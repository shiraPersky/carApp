import { useForm } from 'react-hook-form';//For  simplifies form management, validation, and submission
import { createService, updateService } from '../services/serviceApi';//to interact with the backend API for creating and updating services.
import { useNavigate, useParams } from 'react-router-dom';//useNavigate-to navigate between pages,useParams-to access dynamic URL parameters(ID)
import React from 'react';

const ServiceForm = ({ existingService }: any) => {//will contain the data of the service to be updated
  const { register, handleSubmit, formState: { errors } } = useForm();//register-to register input field to the form.
  //handleSubmit:function to handle form submission.
  //errors: An object that contains any validation errors for the form fields.
  const navigate = useNavigate();
  const { id } = useParams();//Extracts the id parameter from the URL

  const onSubmit = async (data: any) => {//the function called when the form is submitted
    try {
      if (id) {
        await updateService(Number(id), data);
      } else {
        await createService(data);
      }
      navigate('/services');
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Service Type</label>
        <input {...register('service_type', { required: 'Service type is required' })} defaultValue={existingService?.service_type} />
        {/* Ensure the error message is rendered as a string */}
        {errors.service_type && <span>{errors.service_type?.message as string}</span>}
      </div>
      {/* Add fields for other service data here */}
      <button type="submit">{id ? 'Update' : 'Create'} Service</button>
    </form>
  );
};

export default ServiceForm;
