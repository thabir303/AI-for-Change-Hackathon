// const axios = require('axios');

// function getHealthRecommendation(aqi) {
//   if (aqi <= 50) {
//     return { level: 'Good', recommendation: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' };
//   } else if (aqi <= 100) {
//     return { level: 'Moderate', recommendation: 'Air quality is acceptable; however, there may be some health concern for a very small number of people who are unusually sensitive to air pollution.' };
//   } else if (aqi <= 150) {
//     return { level: 'Unhealthy for Sensitive Groups', recommendation: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' };
//   } else if (aqi <= 200) {
//     return { level: 'Unhealthy', recommendation: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' };
//   } else if (aqi <= 300) {
//     return { level: 'Very Unhealthy', recommendation: 'Health alert: everyone may experience more serious health effects.' };
//   } else {
//     return { level: 'Hazardous', recommendation: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
//   }
// }


// exports.getWeatherData = async (req, res, next) => {
//   const { lat, lon } = req.query;

//   if (!lat || !lon) {
//     return res.status(400).json({ message: 'Latitude and Longitude are required' });
//   }

//   try {
//     const apiKey = process.env.OPENWEATHER_API_KEY;
//     if (!apiKey) {
//       throw new Error('OPENWEATHER_API_KEY is not set in environment variables');
//     }
//     const googleApiKey = process.env.GOOGLE_API_KEY;
//     const weatherUrl2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=weather&key=${googleApiKey}`;
//     const airPollutionUrl2 = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${googleApiKey}`;

//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//     const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const soilUrl = `http://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=6b99302450805cc2d739d478c4332775`;

//     const [weatherResponse, airPollutionResponse, soilResponse] = await Promise.all([
//       axios.get(weatherUrl),
//       axios.get(airPollutionUrl),
//       axios.get(soilUrl),
//     ]);

//     //adf

//     const [weatherResponse2, airPollutionResponse2] = await Promise.all([
//       axios.get(weatherUrl2),
//       axios.post(airPollutionUrl2, {
//         location: {
//           latitude: parseFloat(lat),
//           longitude: parseFloat(lon)
//         }
//       })
//     ]);

//     if (!weatherResponse2.data.results.length) {
//       throw new Error('No weather data found for the provided coordinates.');
//     }

//     const weatherData2 = weatherResponse2.data;
//     const airPollutionData2 = airPollutionResponse2.data;

//     console.log('Air Pollution Data:', airPollutionData2);

//     // Extract AQI information from the response
//     const aqiInfo = airPollutionData2.indexes.find(index => index.code === "uaqi");

//     // Create a simplified pollutants obje2ct
//     const simplifiedPollutants = {
//       aqi: aqiInfo.aqi,
//       dominantPollutant: aqiInfo.dominantPollutant,
//       category: aqiInfo.category
//     };

//     console.log('Simplified Pollutants:', simplifiedPollutants);

//     // We're not calculating AQI here as it's 
//     const healthRecommendation = getHealthRecommendation(aqiInfo.aqi);

//     res.json({
//       weather: {
//         city: weatherData2.results[0].name,
//         temperature: weatherData2.results[0].geometry.location.lat, // Replace with actual temperature field
//         humidity: weatherData2.results[0].geometry.location.lng, // Replace with actual humidity field
//         description: weatherData2.results[0].vicinity // Replace with actual weather description field
//       },
//       airPollution: simplifiedPollutants,
//       healthRecommendation: healthRecommendation,
//       dateTime: airPollutionData2.dateTime,
//       regionCode: airPollutionData2.regionCode

//     });

//     //dsvf
//     const weatherData = weatherResponse.data;
//     const airPollutionData = airPollutionResponse.data;
//     const soilData = soilResponse.data;

//     // Fetch historical weather data for the current month
//  // Use a past date for demonstration (e.g., last month)
// const now = new Date();
// now.setMonth(now.getMonth() - 1); // Go back one month

// const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
// const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month

// const month = startDate.toLocaleString('default', { month: 'long' });
// const year = startDate.getFullYear();

// const formatDate = (date) => date.toISOString().split('T')[0];

// const historicalWeatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature`;

// console.log('Historical weather URL:', historicalWeatherUrl);
// console.log('Start date:', formatDate(startDate));
// console.log('End date:', formatDate(endDate));
//    console.log('Historical weather URL:', historicalWeatherUrl);
//     const historicalWeatherResponse = await axios.get(historicalWeatherUrl);
//     const historicalWeatherData = historicalWeatherResponse.data;

//     console.log('Start date:', startDate.toISOString().split('T')[0]);
// console.log('End date:', endDate.toISOString().split('T')[0]);

//     let maxTemp = -Infinity;
//     let minTemp = Infinity;
//     let totalHumidity = 0;
//     let totalFeelsLikeTemp = 0;
//     let count = 0;

//     if (historicalWeatherData.hourly) {
//       console.log('Processing historical data...');
//       historicalWeatherData.hourly.temperature_2m.forEach((temp, index) => {
//         if (temp !== null) {
//           console.log(`Processing temperature: ${temp}`);

//           if (temp > maxTemp) maxTemp = temp;
//           if (temp < minTemp) minTemp = temp;

//           totalHumidity += historicalWeatherData.hourly.relative_humidity_2m[index];
//           totalFeelsLikeTemp += historicalWeatherData.hourly.apparent_temperature[index];
//           count++;
//         }
//       });
//     } else {  console.log('No historical weather data available');
//       console.log('historicalWeatherData:', JSON.stringify(historicalWeatherData, null, 2));
//         }

//     const avgHumidity = totalHumidity / count;
//     const avgFeelsLikeTemp = totalFeelsLikeTemp / count;

//     res.json({
//       weather: {
//         city: weatherData.name,
//         temperature: weatherData.main.temp,
//         humidity: weatherData.main.humidity,
//         description: weatherData.weather[0].description,
//         maxTemp: maxTemp === -Infinity ? null : maxTemp,
//         minTemp: minTemp === Infinity ? null : minTemp,
//         avgHumidity: isNaN(avgHumidity) ? null : avgHumidity,
//         avgFeelsLikeTemp: isNaN(avgFeelsLikeTemp) ? null : avgFeelsLikeTemp,
//         month,
//         year,
//       },
//       airPollution: airPollutionData.list[0]?.components,
//       soil: {
//         moisture: soilData.moisture,
//         temp: soilData.t0,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
  
// };



// //dfsgfshbgh




//controller/weatherController.js
const axios = require('axios');

function getHealthRecommendation(aqi) {
  if (aqi <= 50) {
    return { level: 'Good', recommendation: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' };
  } else if (aqi <= 100) {
    return { level: 'Moderate', recommendation: 'Air quality is acceptable; however, there may be some health concern for a very small number of people who are unusually sensitive to air pollution.' };
  } else if (aqi <= 150) {
    return { level: 'Unhealthy for Sensitive Groups', recommendation: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' };
  } else if (aqi <= 200) {
    return { level: 'Unhealthy', recommendation: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' };
  } else if (aqi <= 300) {
    return { level: 'Very Unhealthy', recommendation: 'Health alert: everyone may experience more serious health effects.' };
  } else {
    return { level: 'Hazardous', recommendation: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
  }
}

exports.getWeatherData = async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey || !googleApiKey) {
      throw new Error('API keys are not set in environment variables');
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;`
    const airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const soilUrl = `http://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=6b99302450805cc2d739d478c4332775`;
    const googleAirQualityUrl = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${googleApiKey}`;

    const [weatherResponse, airPollutionResponse, soilResponse, googleAirQualityResponse] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(airPollutionUrl),
      axios.get(soilUrl),
      axios.post(googleAirQualityUrl, {
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        }
      })
    ]);

    const weatherData = weatherResponse.data;
    const airPollutionData = airPollutionResponse.data;
    const soilData = soilResponse.data;
    const googleAirQualityData = googleAirQualityResponse.data;

    // Process historical weather data
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const historicalWeatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature`;

    const historicalWeatherResponse = await axios.get(historicalWeatherUrl);
    const historicalWeatherData = historicalWeatherResponse.data;

    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let totalHumidity = 0;
    let totalFeelsLikeTemp = 0;
    let count = 0;

    if (historicalWeatherData.hourly) {
      historicalWeatherData.hourly.temperature_2m.forEach((temp, index) => {
        if (temp !== null) {
          if (temp > maxTemp) maxTemp = temp;
          if (temp < minTemp) minTemp = temp;
          totalHumidity += historicalWeatherData.hourly.relative_humidity_2m[index];
          totalFeelsLikeTemp += historicalWeatherData.hourly.apparent_temperature[index];
          count++;
        }
      });
    }

    const avgHumidity = count > 0 ? totalHumidity / count : null;
    const avgFeelsLikeTemp = count > 0 ? totalFeelsLikeTemp / count : null;

    // Extract AQI information from Google Air Quality API
    const aqiInfo = googleAirQualityData.indexes.find(index => index.code === "uaqi");
    const healthRecommendation = getHealthRecommendation(aqiInfo.aqi);

    // Prepare the response
    const response = {
      weather: {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
        maxTemp: maxTemp === -Infinity ? null : maxTemp,
        minTemp: minTemp === Infinity ? null : minTemp,
        avgHumidity,
        avgFeelsLikeTemp,
        month: startDate.toLocaleString('default', { month: 'long' }),
        year: startDate.getFullYear(),
      },
      airPollution: {
        aqi: aqiInfo.aqi,
        dominantPollutant: aqiInfo.dominantPollutant,
        category: aqiInfo.category,
        components: airPollutionData.list[0]?.components
      },
      soil: {
        moisture: soilData.moisture,
        temp: soilData.t0,
      },
      healthRecommendation,
      dateTime: googleAirQualityData.dateTime,
      regionCode: googleAirQualityData.regionCode
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
};