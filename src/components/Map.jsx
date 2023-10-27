import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  Marker,
  TileLayer,
  Popup,
  MapContainer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const [myPosition, setMyPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();
  ////////////////////////////////

  useEffect(() => {
    if (geoLocationPosition)
      setMyPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);
  /////////////////////////////////////
  useEffect(() => {
    if (lat && lng) setMyPosition([lat, lng]);
  }, [lat, lng]);
  //////////////////////////////////
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        // center={myPosition}
        center={myPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        {!geoLocationPosition && (
          <Button type="position" handleClick={getPosition}>
            {isLoadingPosition ? "isLoading..." : "use your Location"}
          </Button>
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city?.position?.lat, city?.position?.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city?.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* <MapChange position={myPosition} /> */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function MapChange({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
