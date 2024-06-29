const axios = require('axios');

exports.getWeatherData = async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    // Fetch weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherResponse = await axios.get(weatherUrl);
    const weatherData = weatherResponse.data;
    
    // Fetch air pollution data
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airPollutionResponse = await axios.get(airPollutionUrl);
    const airPollutionData = airPollutionResponse.data;

    res.json({
      weather: {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
      },
      airPollution: airPollutionData.list[0].components,
    });
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching data' });
  }
};