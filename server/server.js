// import express from 'express';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/get-lat-lng', async (req, res) => {
//   const { address } = req.query;
//   if (!address) {
//     return res.status(400).send({ error: 'Address query parameter is required' });
//   }

//   try {
//     const key = process.env.MAP_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
//     console.log('Request URL:', url); // Log the request URL for debugging

//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('API Response:', data); // Log the API response for debugging

//     if (data.status === 'OK') {
//       const location = data.results[0].geometry.location;
//       return res.send({ latitude: location.lat, longitude: location.lng });
//     } else {
//       return res.status(500).send({ error: 'Unable to fetch latitude and longitude', details: data });
//     }
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const dotenv = require('dotenv');
const getLatLngRoute = require('./routes/getLatLng');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use the routes defined in getLatLng.js
app.use('/', getLatLngRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});











// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// const GOOGLE_MAP_API = process.env.GOOGLE_MAP_API;
// const OPENWEATHERMAP_API = process.env.OPENWEATHERMAP_API;  // Add your OpenWeatherMap API key in .env

// // Middleware to parse JSON
// app.use(express.json());

// // Route to get coordinates by address
// app.get('/geocode', async (req, res) => {
//   const address = req.query.address;
//   if (!address) {
//     return res.status(400).json({ error: 'Address is required' });
//   }

//   try {
//     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAP_API}`;
//     const geocodeResponse = await axios.get(geocodeUrl);
//     const geocodeData = geocodeResponse.data;

//     if (geocodeData.status !== 'OK') {
//       return res.status(400).json({ error: geocodeData.status });
//     }

//     const location = geocodeData.results[0].geometry.location;
//     res.json({ 
//       latitude: location.lat, 
//       longitude: location.lng 
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching geolocation' });
//   }
// });

// // Route to get weather data by coordinates
// app.get('/weather', async (req, res) => {
//   const { lat, lon } = req.query;
//   if (!lat || !lon) {
//     return res.status(400).json({ error: 'Latitude and Longitude are required' });
//   }

//   try {
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHERMAP_API}`;
//     const weatherResponse = await axios.get(weatherUrl);
//     const weatherData = weatherResponse.data;

//     res.json({
//       temperature: weatherData.main.temp,
//       humidity: weatherData.main.humidity,
//       description: weatherData.weather[0].description
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching weather data' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
