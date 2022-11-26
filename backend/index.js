// Packages
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const colors = require('colors');
// Modules
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
// Variables
const port = process.env.PORT || 5000;

// Run Express
const app = express();

// Middlewares
app.use(cors({
    origin: ['localhost:3000',],
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/exercises', require('./routes/exerciseRoutes'));

// Handle Errors in APIs
app.use(errorHandler);



// Listen on port with server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});