"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceController_js_1 = __importDefault(require("./controller/serviceController.js")); // Import the controller
const refuelController_js_1 = __importDefault(require("./controller/refuelController.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse incoming JSON requests
app.use('/services', serviceController_js_1.default); // Use serviceController for any requests to /services
app.use('/refuelings', refuelController_js_1.default); // Use refuelingController for any requests to /refuelings
const PORT = process.env.PORT || 3000; // Define the port
// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000}`);
});
