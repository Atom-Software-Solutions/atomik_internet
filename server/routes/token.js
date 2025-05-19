const express = require('express');
const router = express.Router();
const { validateToken } = require('../controllers/token.controller');

// Route for validating token during authentication
router.get('/validate', validateToken);

module.exports = router;
