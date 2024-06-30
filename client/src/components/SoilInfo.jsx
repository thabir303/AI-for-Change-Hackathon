// componets/SoilInfo.jsx
import PropTypes from 'prop-types';

const SoilInfo = ({ soil }) => {
  return (
    <div className="soil-info">
      <h2>Soil Information</h2>
      <p>Moisture: {soil.moisture}</p>
      <p>Temperature: {soil.temp} °C</p>
    </div>
  );
};

SoilInfo.propTypes = {
  soil: PropTypes.shape({
    moisture: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
  }).isRequired,
};

export default SoilInfo;
