import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const router = express.Router();

// Define types for the API response
interface VehicleRecord {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: string;
  tzeva_rechev: string;
  kvutzat_zihum: string;
  tokef_dt: string;
  ramat_gimur: string;
  mivchan_acharon_dt: string;
  sug_degem: string;
  degem_cd: string;
}

interface ApiResponse {
  success: boolean;
  result: {
    records: VehicleRecord[];
  };
}

// Function to fetch and search CSV data from data.gov.il
const findCarInRemoteCSV = async (licensePlate: string): Promise<any> => {
  try {
    const response = await axios.get<ApiResponse>(
      'https://data.gov.il/api/3/action/datastore_search',
      {
        params: {
          resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
          q: licensePlate,
          limit: 1
        }
      }
    );

    const data = response.data;

    if (data.success && data.result.records.length > 0) {
      const record = data.result.records[0];
      
      return {
        license_plate: record.mispar_rechev?.toString(),
        make: record.tozeret_nm,
        model: record.kinuy_mishari,
        year: parseInt(record.shnat_yitzur),
        color: record.tzeva_rechev,
        emission_group: record.kvutzat_zihum,
        valid_until: record.tokef_dt ? new Date(record.tokef_dt) : null,
        trim_level: record.ramat_gimur,
        last_test: record.mivchan_acharon_dt ? new Date(record.mivchan_acharon_dt) : null,
        model_type: record.sug_degem,
        model_number: record.degem_cd
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching data from data.gov.il:', error);
    throw error;
  }
};

// Route to search for a car by license plate
router.get('/search/:license_plate', (req: Request, res: Response) => {
  const { license_plate } = req.params;
  
  findCarInRemoteCSV(license_plate)
    .then(carData => {
      if (carData) {
        res.status(200).json({
          message: 'Car found in database',
          car: carData
        });
      } else {
        res.status(404).json({ 
          error: 'Car not found', 
          message: `Vehicle with license plate ${license_plate} was not found in the database` 
        });
      }
    })
    .catch(error => {
      console.error('Error searching vehicle:', error);
      res.status(500).json({ 
        error: 'Search failed', 
        message: 'An error occurred while searching the vehicle database' 
      });
    });
});

// Route to import a car to local database
router.post('/import/:license_plate', (req: Request, res: Response) => {
  const { license_plate } = req.params;
  
  // First check if car exists in database
  prisma.car.findUnique({
    where: { license_plate },
  })
    .then(existingCar => {
      if (existingCar) {
        res.status(409).json({ 
          error: 'Car already exists', 
          message: 'This vehicle is already in the database' 
        });
        return null;
      }
      return findCarInRemoteCSV(license_plate);
    })
    .then(carData => {
      if (!carData) {
        return;
      }
      return prisma.car.create({
        data: carData,
      });
    })
    .then(importedCar => {
      if (importedCar) {
        res.status(201).json({
          message: 'Vehicle successfully imported to database',
          car: importedCar
        });
      }
    })
    .catch(error => {
      console.error('Error importing car:', error);
      res.status(500).json({ 
        error: 'Import failed', 
        message: 'An error occurred while importing the vehicle data' 
      });
    });
});

export default router;