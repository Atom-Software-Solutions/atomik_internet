const express = require('express');
const { handlePayment } = require('../controllers/payment.webhook');
const router = express.Router();

// Route for receiving payment confirmation from mobile money providers
router.post('/webhook/payment', handlePayment);

module.exports = router;
