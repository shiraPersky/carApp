import { RequestHandler, Router } from 'express';
import { OdometerService } from '../services/odometerService';

// Create a router instance
const router = Router();

// Define interface for the request body
interface UpdateOdometerRequest {
  licensePlate: string;
  odometer: number;
}

// Define the route handler with RequestHandler type
const updateOdometerHandler: RequestHandler<
  {},                  // params
  any,                 // response
  UpdateOdometerRequest, // request body
  {}                   // query
> = async (req, res) => {
  const { licensePlate, odometer } = req.body;

  // Validate request data
  if (!licensePlate || !odometer) {
    res.status(400).json({ message: 'License plate and odometer are required' });
    return;
  }

  try {
    // Call your OdometerService to update the odometer
    const updatedCar = await OdometerService.updateOdometer(licensePlate, odometer);
    res.status(200).json(updatedCar);
  } catch (error) {
    console.error('Error during odometer update:', error);
    res.status(500).json({ message: 'Failed to update odometer' });
  }
};

// Register the route handler
router.put('/update-odometer', updateOdometerHandler);

export default router;