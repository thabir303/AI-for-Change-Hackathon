// componets/Map.jsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = ({ lat, lon }) => {
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAmc3x1kHjDy8UvtI7_80Vr0bphAxm8Bl4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
