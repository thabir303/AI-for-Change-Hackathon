////leaflet/MarkersMap.jsx
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import UseGeoLocation from "../hooks/UseGeoLocation";
import markerIconPng from "../resources/images/marker.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const ShowLocation = ({ location, ZOOM_LEVEL }) => {
  const map = useMap();

  useEffect(() => {
    if (location.loaded && !location.error) {
      map.setView([location.coordinates.lat, location.coordinates.lng], ZOOM_LEVEL, { animate: true });
    }
  }, [location, map, ZOOM_LEVEL]);

  return null;
};

const MarkersMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  const location = UseGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.setView(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  useEffect(() => {
    if (location.loaded && !location.error) {
      setCenter({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });
    }
  }, [location]);

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Get user location</h2>
          <p>Get user location and highlight it with a marker</p>
          <div className="col">
            <MapContainer
              center={center}
              zoom={ZOOM_LEVEL}
              style={{ height: "80vh", width: "100%" }}
              ref={mapRef}
              whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
            >
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              {location.loaded && !location.error && (
                <Marker
                  icon={markerIcon}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>
              )}
              <ShowLocation location={location} ZOOM_LEVEL={ZOOM_LEVEL} />
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary" onClick={showMyLocation}>
            Locate Me <FontAwesomeIcon icon={faGlobe} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MarkersMap;
