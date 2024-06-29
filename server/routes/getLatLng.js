const express = require('express');
const router = express.Router();

router.get('/get-lat-lng', async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(400).send({ error: 'Address query parameter is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const opencageKey = process.env.OPENCAGE_API_KEY;
    const openweatherKey = process.env.OPENWEATHERMAP_API_KEY;
    
    // Fetch latitude and longitude from OpenCage API
    const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${opencageKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (geoData.status.code !== 200 || geoData.results.length === 0) {
      return res.status(500).send({ error: 'Unable to fetch latitude and longitude', details: geoData });
    }

    const location = geoData.results[0].geometry;
    const latitude = location.lat;
    const longitude = location.lng;

    // Fetch weather data from OpenWeatherMap API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openweatherKey}&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (weatherResponse.status !== 200) {
      return res.status(weatherResponse.status).send({ error: 'Unable to fetch weather data', details: weatherData });
    }

    return res.send({
      latitude,
      longitude,
      weather: weatherData
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
