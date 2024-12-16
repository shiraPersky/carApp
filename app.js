"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var serviceController_js_1 = require("./controller/serviceController.js"); // Import the controller
var app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse incoming JSON requests
app.use('/services', serviceController_js_1.default); // Use serviceController for any requests to /services
var PORT = process.env.PORT || 3000; // Define the port
// Start the Express server and listen on the specified port
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:3000}");
});
