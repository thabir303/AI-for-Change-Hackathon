import PropTypes from 'prop-types';

const getHealthRecommendation = (aqi) => {
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
};

const AirQualityInfo = ({ airPollution }) => {
  const healthRecommendation = getHealthRecommendation(airPollution.aqi);

  return (
    <div className="air-quality-info">
      <h2>Air Quality</h2>
      <ul>
        {Object.entries(airPollution).map(([pollutant, value]) => (
          <li key={pollutant}>
            <p>{pollutant.toUpperCase()}: {value}</p>
          </li>
        ))}
      </ul>
      <div className="health-recommendation">
        <h3>Health Recommendation</h3>
        <p><strong>Level:</strong> {healthRecommendation.level}</p>
        <p><strong>Recommendation:</strong> {healthRecommendation.recommendation}</p>
      </div>
    </div>
  );
};

AirQualityInfo.propTypes = {
  airPollution: PropTypes.shape({
    aqi: PropTypes.number.isRequired,
    dominantPollutant: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
};

export default AirQualityInfo;