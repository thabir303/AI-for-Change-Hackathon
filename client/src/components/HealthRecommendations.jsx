// import React from 'react';
import PropTypes from 'prop-types';

const HealthRecommendations = ({ recommendations }) => {
  return (
    <div className="health-recommendations">
      <h2>Health Recommendations</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>
            <p>Pollutant: {rec.pollutant.toUpperCase()}</p>
            <p>AQI: {rec.aqi}</p>
            <p>Level: {rec.level}</p>
            <p>Recommendation: {rec.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

HealthRecommendations.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      pollutant: PropTypes.string.isRequired,
      aqi: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      recommendation: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HealthRecommendations;
