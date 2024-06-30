import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, FeatureGroup, Popup, Polygon, Polyline } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import UseGeoLocation from "../hooks/UseGeoLocation";
import DescriptionPage from "../component/DescriptionPage";
import { Link } from "react-router-dom"; // Ensure Link is imported correctly
import ChatBot from "../component/chatbot/ChatBot";

// Define marker icon
import markerIconPng from "../resources/images/marker.png";
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [40, 40],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const DrawMap = () => {
  const [center, setCenter] = useState({ lat: 24.4539, lng: 54.3773 });
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const location = UseGeoLocation();

  // Handle creation of shapes
  const handleShapeCreation = (e) => {
    const { layerType, layer } = e;
    if (layerType === "marker") {
      const newShape = {
        type: layerType,
        latlng: layer.getLatLng(),
        placeName: "Place Name", // Replace with actual place name logic
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
    } else if (layerType === "polygon" || layerType === "polyline") {
      const newShape = {
        type: layerType,
        latlngs: layer.getLatLngs(),
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
    }
  };

  // Handle clicking on a shape or marker
  const handleShapeClick = (shape) => {
    setSelectedShape(shape);
  };

  // Render popup content for shapes
  const renderPopupContent = (shape) => {
    if (shape.type === "marker") {
      return (
        <div>
          <strong>Place Name:</strong> {shape.placeName} <br />
          <strong>Latitude:</strong> {shape.latlng.lat} <br />
          <strong>Longitude:</strong> {shape.latlng.lng} <br />
          <Link to={`/map_description/${shape.latlng.lat}/${shape.latlng.lng}`}>
            Go to Map Description
          </Link>
        </div>
      );
    } else if (shape.type === "polygon" || shape.type === "polyline") {
      const latlngs = shape.latlngs.flat();
      const latitudes = latlngs.map((latlng) => latlng.lat);
      const longitudes = latlngs.map((latlng) => latlng.lng);
      const latRange = [Math.min(...latitudes), Math.max(...latitudes)];
      const lngRange = [Math.min(...longitudes), Math.max(...longitudes)];

      return (
        <div>
          <strong>Latitude Range:</strong> {latRange[0]} to {latRange[1]} <br />
          <strong>Longitude Range:</strong> {lngRange[0]} to {lngRange[1]} <br />
          <Link to={`/map_description/${latRange[0]}/${lngRange[0]}`}>
            Go to Map Description
          </Link>
        </div>
      );
    }
  };

  // Effect to set map center based on user location
  useEffect(() => {
    if (location.loaded && !location.error) {
      setCenter({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });
    }
  }, [location]);

  // Function to show user location on the map
  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      const newShape = {
        type: "marker",
        latlng: {
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        },
        placeName: "Your Location",
      };
      setShapes((prevShapes) => [...prevShapes, newShape]);
      setSelectedShape(newShape);
      mapRef.current.setView(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  // Function to handle marker click
  const handleMarkerClick = (shape) => {
    setSelectedShape(shape);
  };

  return (
    <div className="row">
      <div className="col text-center">
        <h2>React-leaflet - Draw shapes on map</h2>
        <div className="col">
          <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: "80vh", width: "100%" }}>
            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={handleShapeCreation}
                draw={{
                  circle: false,
                  circlemarker: false,
                  rectangle: false,
                  marker: true,
                  polyline: true,
                  polygon: true,
                }}
              />
              {/* Render shapes */}
              {shapes.map((shape, index) => (
                <React.Fragment key={index}>
                  {shape.type === "marker" && (
                    <Marker position={shape.latlng} eventHandlers={{ click: () => handleMarkerClick(shape) }}>
                      <Popup>{renderPopupContent(shape)}</Popup>
                    </Marker>
                  )}
                  {shape.type === "polygon" && (
                    <Polygon positions={shape.latlngs}>
                      <Popup>{renderPopupContent(shape)}</Popup>
                    </Polygon>
                  )}
                  {shape.type === "polyline" && (
                    <Polyline positions={shape.latlngs}>
                      <Popup>{renderPopupContent(shape)}</Popup>
                    </Polyline>
                  )}
                </React.Fragment>
              ))}
            </FeatureGroup>
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
            {/* Show user location marker if loaded and no error */}
            {location.loaded && !location.error && (
              <Marker
                icon={markerIcon}
                position={[location.coordinates.lat, location.coordinates.lng]}
                eventHandlers={{ click: () => handleMarkerClick({
                  type: "marker",
                  latlng: {
                    lat: location.coordinates.lat,
                    lng: location.coordinates.lng,
                  },
                  placeName: "Your Location",
                }) }}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Render DescriptionPage conditionally based on selectedShape */}
      {selectedShape && (
        <DescriptionPage
          lat={selectedShape.latlng ? selectedShape.latlng.lat : null}
          lng={selectedShape.latlng ? selectedShape.latlng.lng : null}
        />
      )}

      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary" onClick={showMyLocation}>
            Locate Me <FontAwesomeIcon icon={faGlobe} />
          </button>
        </div>
      </div>
      <ChatBot></ChatBot>
    </div>
    
  );
};

export default DrawMap;
