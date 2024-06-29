import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Enter latitude"
      />
      <input
        type="text"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        placeholder="Enter longitude"
      />
      <button onClick={fetchWeather}>Search</button>
      {data && (
        <div className="data-info">
          <h2>{data.weather.city}</h2>
          <p>Temperature: {data.weather.temperature}°C</p>
          <p>Humidity: {data.weather.humidity}%</p>
          <p>Description: {data.weather.description}</p>
          <h3>Air Pollution Data</h3>
          <p>CO: {data.airPollution.co} μg/m³</p>
          <p>NO: {data.airPollution.no} μg/m³</p>
          <p>NO2: {data.airPollution.no2} μg/m³</p>
          <p>O3: {data.airPollution.o3} μg/m³</p>
          <p>SO2: {data.airPollution.so2} μg/m³</p>
          <p>PM2.5: {data.airPollution.pm2_5} μg/m³</p>
          <p>PM10: {data.airPollution.pm10} μg/m³</p>
          <p>NH3: {data.airPollution.nh3} μg/m³</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Weather;
