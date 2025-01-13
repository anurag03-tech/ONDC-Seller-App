const express = require('express');
const userHandler = require('./routes/userHandler');
const shopHandler = require('./routes/shopHandler');
const KYCHandler = require('./routes/KYCHandler');
const bankHandler = require('./routes/bankHandler');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 5000;

// app.use(
//     cors({
//       origin: process.env.CORS_ORIGIN,
//       credentials: true,
//     })
//   );

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', userHandler);
app.use('/api/shops', shopHandler);
app.use('/api/kyc', KYCHandler);
app.use('/api/bank-account', bankHandler);


// Change from
const homeRoute = require('./routes/home_route');
const dialogflowRoute = require('./routes/dialogflow_route');
app.use(homeRoute.router);
app.use(dialogflowRoute.router);


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'ONDC-Seller-App' // Specify the database name here
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful database connection
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});