////components/Weather.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, CloudRain, Wind, Thermometer, AlertTriangle } from 'lucide-react';
import AQIBarChart from './AQIBarChart';
import Map from './Map';
import './Weather.css';

const WeatherCard = ({ title, icon: Icon, children }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">{title}</h3>
      {Icon && <Icon className="text-muted" />}
    </div>
    <div className="card-content">{children}</div>
  </div>
);

WeatherCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};

const Weather = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weather, setWeather] = useState(null);
  const [airPollution, setAirPollution] = useState(null);
  const [avgAirPollution, setAvgAirPollution] = useState(null);
  const [soil, setSoil] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currentAQI, setCurrentAQI] = useState(null);
  const [avgAQI, setAvgAQI] = useState(null);
  const [healthRecommendations, setHealthRecommendations] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/weather?lat=${lat}&lon=${lon}');
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data.weather);
      setAirPollution(data.airPollution);
      setAvgAirPollution(data.avgAirPollution);
      setSoil(data.soil);
      setForecast(data.forecast);
      setCurrentAQI(data.currentAQI);
      setAvgAQI(data.avgAQI);
      setHealthRecommendations(data.healthRecommendations);
      setError('');
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  const pollutants = ['co', 'no2', 'o3', 'pm2_5', 'pm10'];

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
          className="input"
        />
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Longitude"
          className="input"
        />
        <button className="button" onClick={fetchWeather}>
          <Search /> Search
        </button>
      </div>

      {error && (
        <div className="alert alert-destructive">
          <AlertTriangle />
          <div className="alert-title">Error</div>
          <div>{error}</div>
        </div>
      )}

      {weather && (
        <WeatherCard title="Current Weather" icon={CloudRain}>
          <h2 className="text-2xl font-semibold mb-2">{weather.city}</h2>
          <div className="grid grid-cols-2">
            <p>Temperature: {weather.temperature}°C</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Description: {weather.description}</p>
          </div>
        </WeatherCard>
      )}

      {airPollution && (
        <WeatherCard title="Current Air Pollution" icon={Wind}>
          <div className="grid grid-cols-2">
            <p>CO: {airPollution.co} μg/m³</p>
            <p>NO2: {airPollution.no2} μg/m³</p>
            <p>O3: {airPollution.o3} μg/m³</p>
            <p>PM2.5: {airPollution.pm2_5} μg/m³</p>
            <p>PM10: {airPollution.pm10} μg/m³</p>
          </div>
        </WeatherCard>
      )}

      {avgAirPollution && (
        <WeatherCard title="Average Air Pollution" icon={Wind}>
          <div className="grid grid-cols-2">
            <p>CO: {avgAirPollution.co.toFixed(2)} μg/m³</p>
            <p>NO2: {avgAirPollution.no2.toFixed(2)} μg/m³</p>
            <p>O3: {avgAirPollution.o3.toFixed(2)} μg/m³</p>
            <p>PM2.5: {avgAirPollution.pm2_5.toFixed(2)} μg/m³</p>
            <p>PM10: {avgAirPollution.pm10.toFixed(2)} μg/m³</p>
          </div>
        </WeatherCard>
      )}

      {soil && (
        <WeatherCard title="Soil Data" icon={Thermometer}>
          <div className="grid grid-cols-2">
            <p>Moisture: {soil.moisture}</p>
            <p>Temperature: {(soil.temp - 273.15).toFixed(2)}°C</p>
          </div>
        </WeatherCard>
      )}

      {forecast && (
        <WeatherCard title="Weather Forecast" icon={CloudRain}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-item">
                <p className="font-semibold">{day.date}</p>
                <p>Temp: {day.temperature}°C</p>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        </WeatherCard>
      )}

      {currentAQI && avgAQI && (
        <WeatherCard title="AQI Comparison" icon={Wind}>
          <AQIBarChart currentAQI={currentAQI} avgAQI={avgAQI} pollutants={pollutants} />
        </WeatherCard>
      )}

      {lat && lon && (
        <WeatherCard title="Map Location" icon={CloudRain}>
          <Map lat={lat} lon={lon} />
        </WeatherCard>
      )}

      {healthRecommendations && (
        <WeatherCard title="Health Recommendations" icon={AlertTriangle}>
          {healthRecommendations.map((rec, index) => (
            <div key={index} className="health-recommendation">
              <h4>{rec.pollutant.toUpperCase()} - {rec.level}</h4>
              <p>AQI: {rec.aqi}</p>
              <p>{rec.recommendation}</p>
            </div>
          ))}
        </WeatherCard>
      )}
    </div>
  );
};

export default Weather;