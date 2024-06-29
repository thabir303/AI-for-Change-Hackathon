const axios = require('axios');

exports.getWeatherData = async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const soilUrl = `http://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=55756670624b916339a71119fbbb184d`;

    const weatherResponse = await axios.get(weatherUrl);
    const airPollutionResponse = await axios.get(airPollutionUrl);
    const soilResponse = await axios.get(soilUrl);

    const weatherData = weatherResponse.data;
    const airPollutionData = airPollutionResponse.data;
    const soilData = soilResponse.data;

    // Fetch historical weather data for the current month
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const month = startDate.toLocaleString('default', { month: 'long' });
    const year = startDate.getFullYear();

    const historicalWeatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature`;
    const historicalWeatherResponse = await axios.get(historicalWeatherUrl);
    const historicalWeatherData = historicalWeatherResponse.data;

    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let totalHumidity = 0;
    let totalFeelsLikeTemp = 0;
    let count = 0;

    if (historicalWeatherData.hourly) {
      historicalWeatherData.hourly.temperature_2m.forEach((temp, index) => {
        if (temp !== null) { // Check if temperature data is available
          if (temp > maxTemp) maxTemp = temp;
          if (temp < minTemp) minTemp = temp;

          totalHumidity += historicalWeatherData.hourly.relative_humidity_2m[index];
          totalFeelsLikeTemp += historicalWeatherData.hourly.apparent_temperature[index];
          count++;
        }
      });
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
        year
      },
      airPollution: airPollutionData.list[0].components,
      soil: {
        moisture: soilData.moisture,
        temp: soilData.t0
      }
    });
  } catch (error) {
    next(error);
  }
};