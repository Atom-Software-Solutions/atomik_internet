const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/admin.controller');

// Route for admin dashboard stats
router.get('/stats', getStats);

module.exports = router;
