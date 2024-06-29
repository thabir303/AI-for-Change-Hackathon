import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Gemini from "./Geimini"

const DescriptionPage = () => {
  const { lat, lng } = useParams();
  const [weather, setWeather] = useState(null);
  const [airPollution, setAirPollution] = useState(null);
  const [soil, setSoil] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/weather?lat=${lat}&lon=${lng}`);
        setWeather(response.data.weather);
        setAirPollution(response.data.airPollution);
        setSoil(response.data.soil);
        setError('');
      } catch (err) {
        setError('Error fetching weather data');
      }
    };

    fetchWeather();

    // Clean-up function (optional)
    return () => {
      // Any clean-up code goes here, if needed
    };
  }, [lat, lng]);

  return (
    <>
    <div className="description-page">
      <h2>Description Page</h2>
      <p><strong>Latitude:</strong> {lat}</p>
      <p><strong>Longitude:</strong> {lng}</p>

      {weather && (
        <div className="weather-info">
          <h3>Weather Information</h3>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Description: {weather.description}</p>
          <p>Max Temp for {weather.month} {weather.year}: {weather.maxTemp !== null ? `${weather.maxTemp}°C` : 'N/A'}</p>
          <p>Min Temp for {weather.month} {weather.year}: {weather.minTemp !== null ? `${weather.minTemp}°C` : 'N/A'}</p>
          <p>Average Humidity for {weather.month} {weather.year}: {weather.avgHumidity !== null ? `${weather.avgHumidity}%` : 'N/A'}</p>
          <p>Average Feels Like Temp for {weather.month} {weather.year}: {weather.avgFeelsLikeTemp !== null ? `${weather.avgFeelsLikeTemp}°C` : 'N/A'}</p>
  {/* Add more weather-related information as needed */}
        </div>
      )}

      {airPollution && (
        <div className="air-pollution-info">
          <h3>Air Pollution Information</h3>
          <p>CO: {airPollution.co} μg/m³</p>
          <p>NO: {airPollution.no} μg/m³</p>
          <p>NO2: {airPollution.no2} μg/m³</p>
          <p>O3: {airPollution.o3} μg/m³</p>
          <p>SO2: {airPollution.so2} μg/m³</p>
          <p>PM2.5: {airPollution.pm2_5} μg/m³</p>
          <p>PM10: {airPollution.pm10} μg/m³</p>
          <p>NH3: {airPollution.nh3} μg/m³</p>

          {/* Add more air pollution-related information as needed */}
        </div>
      )}

      {soil && (
        <div className="soil-info">
          <h3>Soil Data</h3>
          <p>Moisture: {soil.moisture}</p>
          <p>Temperature: {soil.temp - 273}°C</p>
          {/* Add more soil-related information as needed */}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
    <Gemini></Gemini>
    </>

  );
};

export default DescriptionPage;
