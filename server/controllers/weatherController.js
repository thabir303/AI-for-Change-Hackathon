const axios = require('axios');

exports.getWeatherData = async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENWEATHER_API_KEY is not set in environment variables');
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const soilUrl = `http://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=6b99302450805cc2d739d478c4332775`;

    const [weatherResponse, airPollutionResponse, soilResponse] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(airPollutionUrl),
      axios.get(soilUrl),
    ]);

    const weatherData = weatherResponse.data;
    const airPollutionData = airPollutionResponse.data;
    const soilData = soilResponse.data;

    // Fetch historical weather data for the current month
 // Use a past date for demonstration (e.g., last month)
const now = new Date();
now.setMonth(now.getMonth() - 1); // Go back one month

const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month

const month = startDate.toLocaleString('default', { month: 'long' });
const year = startDate.getFullYear();

const formatDate = (date) => date.toISOString().split('T')[0];

const historicalWeatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature`;

console.log('Historical weather URL:', historicalWeatherUrl);
console.log('Start date:', formatDate(startDate));
console.log('End date:', formatDate(endDate));
   console.log('Historical weather URL:', historicalWeatherUrl);
    const historicalWeatherResponse = await axios.get(historicalWeatherUrl);
    const historicalWeatherData = historicalWeatherResponse.data;

    console.log('Start date:', startDate.toISOString().split('T')[0]);
console.log('End date:', endDate.toISOString().split('T')[0]);

    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let totalHumidity = 0;
    let totalFeelsLikeTemp = 0;
    let count = 0;

    if (historicalWeatherData.hourly) {
      console.log('Processing historical data...');
      historicalWeatherData.hourly.temperature_2m.forEach((temp, index) => {
        if (temp !== null) {
          console.log(`Processing temperature: ${temp}`);

          if (temp > maxTemp) maxTemp = temp;
          if (temp < minTemp) minTemp = temp;

          totalHumidity += historicalWeatherData.hourly.relative_humidity_2m[index];
          totalFeelsLikeTemp += historicalWeatherData.hourly.apparent_temperature[index];
          count++;
        }
      });
    } else {  console.log('No historical weather data available');
      console.log('historicalWeatherData:', JSON.stringify(historicalWeatherData, null, 2));
        }

    const avgHumidity = totalHumidity / count;
    const avgFeelsLikeTemp = totalFeelsLikeTemp / count;

    res.json({
      weather: {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
        maxTemp: maxTemp === -Infinity ? null : maxTemp,
        minTemp: minTemp === Infinity ? null : minTemp,
        avgHumidity: isNaN(avgHumidity) ? null : avgHumidity,
        avgFeelsLikeTemp: isNaN(avgFeelsLikeTemp) ? null : avgFeelsLikeTemp,
        month,
        year,
      },
      airPollution: airPollutionData.list[0]?.components,
      soil: {
        moisture: soilData.moisture,
        temp: soilData.t0,
      },
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};




