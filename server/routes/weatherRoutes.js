const express = require('express');
const { getWeatherData } = require('../controllers/weatherController'); // Ensure this import is correct

const router = express.Router();

router.get('/', getWeatherData); 

module.exports = router;