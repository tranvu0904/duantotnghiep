import React, { useEffect, useState } from "react";
import { apiGetLongtitudeAndLatitudeFromAddress } from "../services/app";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const RecenterAutomatically = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center.length > 0) {
      map.setView(center);
    }
  }, [center]);
  return null;
};

const Map = ({ address, zoom }) => {
  const [center, setCenter] = useState([]);
  useEffect(() => {
    const fetchCenter = async () => {
      if (address) {
        try {
          const response = await apiGetLongtitudeAndLatitudeFromAddress(address);
          if (response.status === 200 && response.data.results.length > 0) {
            setCenter([
              response.data.results[0].geometry.lat,
              response.data.results[0].geometry.lng,
            ]);
          } else {
            getCurrentLocation();
          }
        } catch (error) {
          console.error("Error fetching address coordinates:", error);
          getCurrentLocation();
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      navigator.geolocation &&
        navigator.geolocation.getCurrentPosition((position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        });
    };

    fetchCenter();
  }, [address, setCenter]);

  return (
    <>
      {center && center.length > 0 && (
        <MapContainer
          className="h-[300px] w-full"
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
        >
          <RecenterAutomatically center={center} />
          <TileLayer attribution={attribution} url={url} />
          <Marker position={center}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
