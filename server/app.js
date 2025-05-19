
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error.handler');
require('dotenv').config();

// Load env variables
dotenv.config();

// Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use('/api', require('./routes/webhook'));
app.use('/api/token', require('./routes/token'));
app.use('/api/admin', require('./routes/admin'));

// Error handling
app.use(errorHandler);

module.exports = app;
