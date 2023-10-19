const cors = require('cors');
const express = require('express');
const connectDatabase = require('../database/db');
const app = express();
const port = 4000; // Updated port number
const dbRouter = require('./routes/YourModelRoutes')



// Import required modules and routes
const authRoutes = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const morgan = require('morgan');


// Middleware setup
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging in 'dev' format
app.use(express.json()); // Parse JSON request bodies
app.use('/auth', authRoutes); // Mount authentication routes
app.use('/task', taskRouter); 
app.use('/table', dbRouter);// Mount task routes

connectDatabase

// Define route for checking server status
app.get('/status', (req, res) => {
  console.log('Server status check endpoint hit.');
  res.status(200).json({ status: 'Server is running' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

