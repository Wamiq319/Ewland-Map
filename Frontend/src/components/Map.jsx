import React from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import { addMarker, setSelectedMarker } from "../redux/mapSlice";
import "leaflet/dist/leaflet.css";
import MapBackground from "../assets/MapBackground.svg";

const bounds = [
  [-17, -25], // Top-left
  [30, 30], // Bottom-right
];

// Custom icon creator function
const customIcon = (iconUrl) =>
  L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 30], // Adjust size as needed
    iconAnchor: [12, 41], // Adjust anchor point
    popupAnchor: [1, -34], // Adjust popup position
  });

// MapClickHandler component
const MapClickHandler = ({ selectedIcon }) => {
  const dispatch = useDispatch();

  useMapEvents({
    click: (e) => {
      if (selectedIcon) {
        const { lat, lng } = e.latlng;
        dispatch(
          addMarker({
            x: lng,
            y: lat,
            icon: selectedIcon,
            headline: "New Marker",
            description: "Description here",
          })
        );
      }
    },
  });

  return null;
};

// Main Map component
const Map = ({ selectedIcon }) => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.map.markers);

  return (
    <MapContainer
      center={[5, 5]}
      zoom={4}
      className="h-[500px] w-[90%] my-3 shadow-lg"
      crs={L.CRS.Simple}
    >
      <ImageOverlay url={MapBackground} bounds={bounds} />
      <MapClickHandler selectedIcon={selectedIcon} />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.y, marker.x]}
          icon={customIcon(marker.icon)} // Convert URL to L.Icon
          eventHandlers={{
            click: () => {
              dispatch(setSelectedMarker(marker));
            },
          }}
        >
          <Tooltip>{marker.headline}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
