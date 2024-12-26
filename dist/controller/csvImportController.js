"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create the router
const router = express_1.default.Router();
// Post route to handle CSV file import
router.post('/importWithMode', (req, res) => {
    const { mode } = req.body; // Retrieve the mode from the request body (auto or manual)
    if (!mode || (mode !== 'auto' && mode !== 'manual')) {
        res.status(400).json({ error: 'Invalid mode. Use "auto" or "manual".' });
        return; // Early return to prevent further code execution
    }
    const handleModeImport = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const csvFilePath = path_1.default.join(__dirname, '../../data/csv/carNum2.csv'); // Path to the predefined CSV file
            const results = [];
            // Check if the file exists
            if (!fs_1.default.existsSync(csvFilePath)) {
                res.status(404).json({ error: 'CSV file not found in the data/csv folder' });
                return; // Early return if the file doesn't exist
            }
            // Read and parse the CSV file
            fs_1.default.createReadStream(csvFilePath)
                .pipe((0, csv_parser_1.default)({
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
            }))
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
                .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                console.log('Finished processing CSV file.');
                // Check if we actually have data after parsing
                if (results.length === 0) {
                    console.log('No data found in the CSV file.');
                    res.status(500).json({ error: 'No data found in the CSV file.' });
                    return;
                }
                try {
                    // Insert the mapped data into the database using Prisma
                    const prismaResults = yield prisma.car.createMany({
                        data: results, // Use the mapped results
                        skipDuplicates: true, // Prevent duplicate entries if applicable
                    });
                    res.status(200).json({
                        message: 'Import completed successfully',
                        importedRecords: prismaResults.count, // Number of successfully imported records
                    });
                }
                catch (dbError) {
                    console.error('Error inserting data into database:', dbError);
                    res.status(500).json({ error: 'Error inserting data into the database' });
                }
            }))
                .on('error', (error) => {
                console.error('Error processing CSV:', error);
                res.status(500).json({ error: 'Error processing CSV' });
            });
        }
        catch (error) {
            console.error('Error during import:', error);
            res.status(500).json({ error: 'An error occurred during CSV import' });
        }
    });
    // Call the function
    handleModeImport();
});
// Get route to fetch a car by license plate
router.get('/getCarByLicensePlate/:license_plate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license_plate } = req.params;
    try {
        const car = yield prisma.car.findUnique({
            where: { license_plate },
        });
        if (car) {
            res.status(200).json(car);
        }
        else {
            res.status(404).json({ error: `Car with license plate ${license_plate} not found` });
        }
    }
    catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Error fetching car data' });
    }
}));
exports.default = router;
