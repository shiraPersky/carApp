import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create the router
const router = express.Router();

// Post route to handle CSV file import
router.post('/importWithMode', (req: Request, res: Response): void => {
  const { mode } = req.body;  // Retrieve the mode from the request body (auto or manual)

  if (!mode || (mode !== 'auto' && mode !== 'manual')) {
    res.status(400).json({ error: 'Invalid mode. Use "auto" or "manual".' });
    return;  // Early return to prevent further code execution
  }

  const handleModeImport = async () => {
    try {
      const csvFilePath = path.join(__dirname, '../../data/csv/carNum2.csv'); // Path to the predefined CSV file
      console.log('CSV file path:', csvFilePath);  // Log the path to ensure it's correct
      const results: any[] = [];

      // Check if the file exists
      if (!fs.existsSync(csvFilePath)) {
        console.error('CSV file not found in the data/csv folder');
        res.status(404).json({ error: 'CSV file not found in the data/csv folder' });
        return; // Early return if the file doesn't exist
      }

      // Read and parse the CSV file
      fs.createReadStream(csvFilePath)
        .pipe(
          csv({
            headers: [
              'mispar_rechev', // license_plate
              'tozeret_nm', // make
              'kinuy_mishari', // model
              'shnat_yitzur', // year
              'tzeva_rechev', // color
              'kvutzat_zihum', // emission_group
              'tokef_dt', // valid_until
              'ramat_gimur', // trim_level
              'mivchan_acharon_dt', // last_test
              'sug_degem', // model_type
              'degem_cd', // model_number
            ],
            separator: ',', // Define the column separator
          })
        )
        .on('data', (data) => {
          console.log('Parsed data:', data); // Debugging: log parsed data

          // Map CSV data to Prisma schema fields
          const mappedData = {
            license_plate: data.mispar_rechev,
            make: data.tozeret_nm,
            model: data.kinuy_mishari,
            year: parseInt(data.shnat_yitzur, 10), // Convert to integer
            color: data.tzeva_rechev,
            emission_group: data.kvutzat_zihum,
            valid_until: new Date(data.tokef_dt), // Convert to Date object
            trim_level: data.ramat_gimur,
            last_test: new Date(data.mivchan_acharon_dt), // Convert to Date object
            model_type: data.sug_degem,
            model_number: data.degem_cd,
          };

          results.push(mappedData);
        })
        .on('end', async () => {
          console.log('Finished processing CSV file.');
          console.log('Mapped data to be inserted:', results);

          // Check if we actually have data after parsing
          if (results.length === 0) {
            console.log('No data found in the CSV file.');
            res.status(500).json({ error: 'No data found in the CSV file.' });
            return;
          }

          try {
            // Insert the mapped data into the database using Prisma
            const prismaResults = await prisma.car.createMany({
              data: results, // Use the mapped results
              skipDuplicates: true, // Prevent duplicate entries if applicable
            });

            console.log('Inserted records:', prismaResults.count);

            res.status(200).json({
              message: 'Import completed successfully',
              importedRecords: prismaResults.count, // Number of successfully imported records
            });
          } catch (dbError) {
            console.error('Error inserting data into database:', dbError);
            res.status(500).json({ error: 'Error inserting data into the database' });
          }
        })
        .on('error', (error) => {
          console.error('Error processing CSV:', error);
          res.status(500).json({ error: 'Error processing CSV' });
        });
    } catch (error) {
      console.error('Error during import:', error);
      res.status(500).json({ error: 'An error occurred during CSV import' });
    }
  };

  // Call the function
  handleModeImport();
});

// Get route to fetch a car by license plate
router.get('/getCarByLicensePlate/:license_plate', async (req: Request, res: Response) => {
  const { license_plate } = req.params;

  try {
    const car = await prisma.car.findUnique({
      where: { license_plate },
    });

    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: `Car with license plate ${license_plate} not found` });
    }
  } catch (error) {
    console.error('Error fetching car data:', error);
    res.status(500).json({ error: 'Error fetching car data' });
  }
});

export default router;
