import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Gemini from "./Gemini";
// import './index.css';

const DescriptionPage = () => {
  const { lat, lng } = useParams();
  const [weather, setWeather] = useState(null);
  const [airPollution, setAirPollution] = useState(null);
  const [soil, setSoil] = useState(null);
  const [healthRecommendation, setHealthRecommendation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/weather?lat=${lat}&lon=${lng}`);
        setWeather(response.data.weather);
        setAirPollution(response.data.airPollution);
        setSoil(response.data.soil);
        setHealthRecommendation(response.data.healthRecommendation);
        setError('');
      } catch (err) {
        setError('Error fetching weather data');
      }
    };

    fetchWeather();
  }, [lat, lng]);

  const generatePrompt = () => {
    let prompt = '';

    if (weather) {
      prompt += `Weather Information:\n`;
      prompt += `City: ${weather.city}\n`;
      prompt += `Temperature: ${(weather.temperature).toFixed(2)}°C\n`;
      prompt += `Humidity: ${weather.humidity}%\n`;
      prompt += `Description: ${weather.description}\n`;
      prompt += `Max Temp for ${weather.month} ${weather.year}: ${weather.maxTemp !== null ? `${weather.maxTemp}°C` : 'N/A'}\n`;
      prompt += `Min Temp for ${weather.month} ${weather.year}: ${weather.minTemp !== null ? `${weather.minTemp}°C` : 'N/A'}\n`;
      prompt += `Average Humidity for ${weather.month} ${weather.year}: ${weather.avgHumidity !== null ? `${weather.avgHumidity}%` : 'N/A'}\n`;
      prompt += `Average Feels Like Temp for ${weather.month} ${weather.year}: ${weather.avgFeelsLikeTemp !== null ? `${weather.avgFeelsLikeTemp}°C` : 'N/A'}\n\n`;
    }

    if (airPollution) {
      prompt += `Air Pollution Information:\n`;
      prompt += `AQI: ${airPollution.aqi}\n`;
      prompt += `Dominant Pollutant: ${airPollution.dominantPollutant}\n`;
      prompt += `Category: ${airPollution.category}\n`;
      prompt += `CO: ${airPollution.components.co} μg/m³\n`;
      prompt += `NO: ${airPollution.components.no} μg/m³\n`;
      prompt += `NO2: ${airPollution.components.no2} μg/m³\n`;
      prompt += `O3: ${airPollution.components.o3} μg/m³\n`;
      prompt += `SO2: ${airPollution.components.so2} μg/m³\n`;
      prompt += `PM2.5: ${airPollution.components.pm2_5} μg/m³\n`;
      prompt += `PM10: ${airPollution.components.pm10} μg/m³\n`;
      prompt += `NH3: ${airPollution.components.nh3} μg/m³\n\n`;
    }

    if (soil) {
      prompt += `Soil Data:\n`;
      prompt += `Moisture: ${soil.moisture}\n`;
      prompt += `Temperature: ${(soil.temp).toFixed(2)}°C\n`;
    }

    return prompt;
  };

  const prompt = generatePrompt();

  return (
    <div className="description-page">
      <h2>Description Page</h2>
      <p><strong>Latitude:</strong> {lat}</p>
      <p><strong>Longitude:</strong> {lng}</p>

      {weather && (
        <div className="weather-info">
          <h3>Weather Information</h3>
          <h2>{weather.city}</h2>
          <p>Temperature: {(weather.temperature).toFixed(2)}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Description: {weather.description}</p>
          <p>Max Temp for {weather.month} {weather.year}: {weather.maxTemp !== null ? `${weather.maxTemp}°C` : 'N/A'}</p>
          <p>Min Temp for {weather.month} {weather.year}: {weather.minTemp !== null ? `${weather.minTemp}°C` : 'N/A'}</p>
          <p>Average Humidity for {weather.month} {weather.year}: {weather.avgHumidity !== null ? `${weather.avgHumidity}%` : 'N/A'}</p>
          <p>Average Feels Like Temp for {weather.month} {weather.year}: {weather.avgFeelsLikeTemp !== null ? `${weather.avgFeelsLikeTemp}°C` : 'N/A'}</p>
        </div>
      )}

      {airPollution && (
        <div className="air-pollution-info">
          <h3>Air Pollution Information</h3>
          <p>AQI: {airPollution.aqi}</p>
          <p>Dominant Pollutant: {airPollution.dominantPollutant}</p>
          <p>Category: {airPollution.category}</p>
          <p>CO: {airPollution.components.co} μg/m³</p>
          <p>NO: {airPollution.components.no} μg/m³</p>
          <p>NO2: {airPollution.components.no2} μg/m³</p>
          <p>O3: {airPollution.components.o3} μg/m³</p>
          <p>SO2: {airPollution.components.so2} μg/m³</p>
          <p>PM2.5: {airPollution.components.pm2_5} μg/m³</p>
          <p>PM10: {airPollution.components.pm10} μg/m³</p>
          <p>NH3: {airPollution.components.nh3} μg/m³</p>
          <div className="health-recommendation">
            <h4>Health Recommendation</h4>
            <p><strong>Level:</strong> {healthRecommendation.level}</p>
            <p><strong>Recommendation:</strong> {healthRecommendation.recommendation}</p>
          </div>
        </div>
      )}

      {soil && (
        <div className="soil-info">
          <h3>Soil Data</h3>
          <p>Moisture: {soil.moisture}</p>
          <p>Temperature: {((soil.temp).toFixed(2)) - 273}°C</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <Gemini dataprompt={prompt} />
    </div>
  );
};

export default DescriptionPage;
