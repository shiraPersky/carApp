Car Maintenance App

Project Description:
This web application allows users to track all aspects of vehicle maintenance, including refueling, garage visits, and more. It provides reminders, fuel statistics, serviceS and odometer updates to help manage car health efficiently.

Features:
*Refueling Tracking: Log and view refueling events with price and fuel quantity.
*Garage Visits: Track car maintenance visits to the garage for services and repairs.
*Reminders: Set custom reminders based on odometer readings or specific dates (e.g., oil changes, tire rotations).
*Fuel Statistics: View fuel efficiency data and statistics for your vehicle.
*Odometer Updates: Update odometer readings and track usage over time.
*Email Notifications: Get reminders for upcoming maintenance tasks via email.

Technologies Used:
*Backend: Node.js, Express.js, TypeScript, Prisma, PostgreSQL
*Frontend: React, TypeScript, Vite
*Database: PostgreSQL (managed via Prisma)
*Email Service: Nodemailer for sending email notifications

Folder Structure:
*Backend
    controllers/: Contains files that define the API endpoints and handle HTTP requests. Each controller manages specific functionality for car maintenance.
        add_carController.ts: Handles the logic for adding a new car.
        csvImportController.ts: Handles the CSV import feature for car details.
        emailController.ts: Handles email notifications (e.g., reminders).
        fuelStatisticsController.ts: Handles fuel statistics-related endpoints.
        odometerController.ts: Handles odometer updates.
        refuelController.ts: Manages refueling logs.
        refuelingScanController.ts: Manages refueling scan actions.
        reminderController.ts: Handles reminder management.
        serviceController.ts: Manages service records.
    dto/: Data Transfer Objects (DTOs) for defining the structure of data being sent to and received from the database.
        add_carDto.ts: Defines the structure for car addition.
        fuelStatisticsDto.ts: Defines the structure for fuel statistics.
        refuelDto.ts: Defines the structure for refueling logs.
        reminderDto.ts: Defines the structure for reminders.
        serviceDto.ts: Defines the structure for service records.
    services/: Contains business logic for the application. Each service handles data processing and calls the appropriate controllers and DTOs.
        add_carService.ts: Manages car-related business logic.
        emailService.ts: Handles email-related functionality, such as sending reminders.
        fuelStatisticsService.ts: Manages fuel efficiency data and calculations.
        odometerService.ts: Handles logic for updating and managing odometer readings.
        refuelService.ts: Manages the business logic for refueling.
        reminderService.ts: Manages reminder-related functionality.
        serviceService.ts: Handles logic for service records.
    prisma/: Contains files related to Prisma ORM and the database schema.
        schema.prisma: Defines the structure of the database tables and relationships.
*Frontend
    public/: Contains static files served by the app, such as images, icons, and the index.html file.
        vite.svg: Vite logo used for the development environment.
    src/: Contains all the source code for the frontend, including components, pages, and services.
        pages/: Defines the main pages of the app.
            Cars/: Contains pages related to car management.
                AddCarPage.tsx: Page for adding a new car.
                CarsPage.tsx: Page for viewing a list of cars.
                EditCarPage.tsx: Page for editing an existing car.
                OdometerUpdatePage.tsx: Page for updating the car's odometer reading.
            Refueling/: Contains pages related to refueling.
                AddRefuelingPage.tsx: Page for adding a refueling event.
                EditRefuelingPage.tsx: Page for editing refueling events.
                RefuelingPage.tsx: Page for viewing refueling history.
            Reminders/: Contains pages related to reminders.
                AddReminderPage.tsx: Page for adding a new reminder.
                EditReminderPage.tsx: Page for editing a reminder.
                ReminderPage.tsx: Page for viewing all reminders.
            Service/: Contains pages related to car service.
                FuelStatisticsPage.tsx: Page for displaying fuel statistics.
        components/: Reusable UI components used throughout the app.
            Cars/: Components related to car management.
                CarDetails.tsx, CarForm.tsx, CarList.tsx, OdometerForm.tsx.
            Refueling/: Components related to refueling management.
                RefuelingDetails.tsx, RefuelingForm.tsx, RefuelingList.tsx.
            Reminders/: Components related to reminders.
                ReminderDetails.tsx, ReminderForm.tsx, ReminderList.tsx.
            Service/: Components related to service management.
                ServiceDetails.tsx, ServiceForm.tsx, ServiceList.tsx.
            fuelStatistics/: Components related to fuel statistics.
                DropDownMenu.tsx, FuelStatisticItem.tsx, GraphComponents.tsx, PieChart.tsx.
        services/: Contains services for interacting with the backend API.
            serviceApi.ts: API service for making HTTP requests to the backend.

Other Files:
    tsconfig.json: TypeScript configuration file.
    package.json: Defines the dependencies and scripts for the Node.js backend.
    .gitignore: Specifies which files and folders to ignore in version control.
    app.ts: The main entry point for the backend server.
    
Setup Instructions:
1. Clone the repository
git clone https://github.com/shiraPersky/carApp.git
2. Install dependencies
Backend:
    Navigate to the Backend folder-->Install dependencies:cd Backend-->npm install
Frontend:
    Navigate to the React folder-->Install dependencies:cd React-->npm install
3. Configuration
Before running the application, update the .env file to include the following variables:
Backend:
    DB_HOST: Database host (e.g., localhost or your database URL).
    DB_USER: Your database username.
    DB_PASS: Your database password.
    DB_NAME: The name of your PostgreSQL database.
    EMAIL_HOST: The SMTP server for sending emails (e.g., Gmail, Mailgun).
    EMAIL_PORT: The port used by the SMTP server.
    EMAIL_USER: Your email address for sending notifications.
    EMAIL_PASS: The password or API key for the email service.
Frontend:
    REACT_APP_API_URL: URL of the backend API (e.g., http://localhost:3000).
4. Running Locally
Backend:
    Start the backend server:(from the main folder of CarApp)npx tsc-->node dist/app.js
    This will start the API on http://localhost:3000 (or the port defined in your .env).
Frontend:
    Start the frontend development server:cd Reactcd React-->npm run dev
    This will start the frontend app on http://localhost:5173 by default.
5. API Endpoints
    *POST /cars: Add a new car.
    *GET /cars: Get all cars.
    *GET /cars/:id: Get details of a specific car.
    *POST /refuel: Add a refueling event.
    *GET /fuel-statistics: Get fuel efficiency statistics.
    *POST /reminder: Set a reminder.


Contributing:
Feel free to fork this repository and submit pull requests for improvements or new features. Please follow the standard GitHub workflow for creating branches, making changes, and submitting pull requests.


Contact:
For any questions or issues, feel free to reach out to shira.persky@gmail.com.