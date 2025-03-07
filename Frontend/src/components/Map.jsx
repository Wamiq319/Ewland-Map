import React, { useState, useEffect } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Tooltip,
  useMapEvents,
  useMap,
  FeatureGroup,
  LayerGroup,
  Polyline,
  Polygon,
  Rectangle,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import {
  addMarker,
  setSelectedMarker,
  clearSelectedMarker,
} from "../redux/markerSlice";
import { addDrawing, initializeDrawings } from "../redux/drawingSlice";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapBackground from "../assets/MapBackground.svg";
import { EditControl } from "react-leaflet-draw";

// Map bounds
const bounds = [
  [-17, -25], // Top-left
  [30, 30], // Bottom-right
];

// Custom icon creator function
const customIcon = (iconUrl) =>
  L.icon({
    iconUrl: iconUrl,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
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

// ZoomLevelDisplay component
const ZoomLevelDisplay = ({ onZoomChange }) => {
  const map = useMap(); // Use the useMap hook inside a descendant of MapContainer
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  // Listen for zoom events
  useEffect(() => {
    const updateZoomLevel = () => {
      const newZoomLevel = map.getZoom();
      setZoomLevel(newZoomLevel); // Update local state
      onZoomChange(newZoomLevel); // Notify parent component
    };

    map.on("zoomend", updateZoomLevel); // Listen for zoom events

    return () => {
      map.off("zoomend", updateZoomLevel); // Cleanup event listener
    };
  }, [map, onZoomChange]);

  return (
    <div className="p-1 bg-white border border-gray-300 rounded text-sm">
      Zoom: {zoomLevel.toFixed(2)}
    </div>
  );
};

// Main Map component
const Map = ({ selectedIcon, setSelectedIcon }) => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.markers.markers);
  const drawings = useSelector((state) => state.drawings.drawings);
  const [color, setColor] = useState("#000000"); // Default color for drawings
  const [isDrawingMode, setIsDrawingMode] = useState(false); // Track drawing mode
  const [isDeleteMode, setIsDeleteMode] = useState(false); // Track delete mode
  const [zoomLevel, setZoomLevel] = useState(4); // Track current zoom level
  const [lineStyle, setLineStyle] = useState("solid"); // Track line style (solid or dashed)
  const [lineWidth, setLineWidth] = useState(2); // Track line width (2px, 4px, 6px, 8px, or 10px)

  // Load drawings from local storage on component mount
  useEffect(() => {
    dispatch(initializeDrawings()); // Initialize drawings from localStorage
  }, [dispatch]);

  // Handle drawing creation
  const handleCreated = (e) => {
    const layer = e.layer;
    const type = e.layerType;
    const latlngs = layer.getLatLngs();
    const id = `${latlngs[0].lat}-${latlngs[0].lng}`; // Unique ID based on latitude and longitude

    dispatch(
      addDrawing({
        id,
        type,
        latlngs,
        color,
        fillColor: color, // Use the selected color as fill color
        lineStyle, // Save the selected line style
        lineWidth, // Save the selected line width
      })
    );

    // Exit drawing mode after creating a drawing
    setIsDrawingMode(false);
  };

  // Handle clicking on a drawing
  const handleDrawingClick = (drawing) => {
    if (isDeleteMode) {
      // Show a confirmation dialog before deleting the drawing
      const confirmation = window.confirm(
        "Are you sure you want to delete this drawing?"
      );

      if (confirmation) {
        // Remove the drawing from local storage
        const savedDrawings =
          JSON.parse(localStorage.getItem("drawings")) || [];
        const updatedDrawings = savedDrawings.filter(
          (d) => d.id !== drawing.id
        );
        localStorage.setItem("drawings", JSON.stringify(updatedDrawings));

        console.log("Drawing removed from local storage:", drawing);

        // Reinitialize the drawings in the Redux state
        dispatch(initializeDrawings()); // Reload drawings from localStorage
      } else {
        console.log("Drawing deletion canceled.");
      }
    } else {
      // Show alert to toggle delete mode
      alert("Toggle drawing to delete mode to delete drawing");
    }
  };

  // Save drawings to local storage when the "Save Drawings" button is clicked
  const handleSaveDrawings = () => {
    localStorage.setItem("drawings", JSON.stringify(drawings));
    alert("Drawings saved to local storage!");
  };

  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setIsDrawingMode((prev) => !prev);
    setIsDeleteMode(false);
    setSelectedIcon(null);
    dispatch(clearSelectedMarker());
  };

  // Toggle delete mode
  const toggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
    setIsDrawingMode(false);
  };

  // Render drawings on the map
  const renderDrawings = () => {
    if (zoomLevel < 4) return null; // Hide drawings if zoom level is less than 3

    return drawings.map((drawing) => {
      const eventHandlers = {
        click: () => handleDrawingClick(drawing),
      };

      switch (drawing.type) {
        case "polyline":
          return (
            <Polyline
              key={drawing.id}
              positions={drawing.latlngs}
              color={drawing.color}
              weight={drawing.lineWidth} // Use the selected line width
              dashArray={drawing.lineStyle === "dashed" ? "5, 10" : undefined} // Use the selected line style
              eventHandlers={eventHandlers}
            />
          );
        case "polygon":
          return (
            <Polygon
              key={drawing.id}
              positions={drawing.latlngs}
              color={drawing.color}
              fillColor={drawing.fillColor}
              weight={0} // Remove border
              eventHandlers={eventHandlers}
            />
          );
        default:
          return null;
      }
    });
  };

  // Render markers on the map
  const renderMarkers = () => {
    if (zoomLevel < 4) return null; // Hide markers if zoom level is less than 3

    return markers.map((marker, index) => (
      <Marker
        key={index}
        position={[marker.y, marker.x]}
        icon={customIcon(marker.icon)}
        eventHandlers={{
          click: () => dispatch(setSelectedMarker(marker)),
        }}
      >
        <Tooltip>{marker.headline}</Tooltip>
      </Marker>
    ));
  };

  return (
    <MapContainer
      center={[5, 5]}
      zoom={4}
      className="h-[500px] w-[95%] my-3 shadow-lg"
      crs={L.CRS.Simple}
    >
      <ImageOverlay url={MapBackground} bounds={bounds} />
      <MapClickHandler selectedIcon={selectedIcon} />

      {/* FeatureGroup to manage drawn shapes */}
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          onEdited={(e) => {
            const layers = e.layers;
            layers.eachLayer((layer) => {
              const editedDrawing = drawings.find(
                (drawing) => drawing.id === layer._leaflet_id
              );
              if (editedDrawing) {
                dispatch(
                  addDrawing({
                    ...editedDrawing,
                    latlngs: layer.getLatLngs(),
                  })
                );
              }
            });
          }}
          draw={{
            rectangle: false,
            polygon: true,
            circle: false,
            marker: false,
            polyline: {
              shapeOptions: {
                color: color,
                weight: lineWidth, // Use the selected line width
                dashArray: lineStyle === "dashed" ? "5, 10" : undefined, // Use the selected line style
              },
            },
            circlemarker: true,
          }}
          edit={{
            edit: {
              selectedPathOptions: {
                color: "#ff0000", // Customize selected path color
                weight: 2,
              },
            },
            remove: false, // Disable delete option
          }}
        />
      </FeatureGroup>

      {/* Render existing markers */}
      <LayerGroup>{renderMarkers()}</LayerGroup>

      {/* Render drawings */}
      <LayerGroup>{renderDrawings()}</LayerGroup>

      {/* Color picker and buttons */}
      <div
        className="absolute top-2 left-2 flex items-center gap-2 "
        style={{ zIndex: 900 }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded-full ml-10"
        />

        <select
          value={lineStyle}
          onChange={(e) => setLineStyle(e.target.value)}
          className="p-1 border border-gray-300 rounded-full"
        >
          <option value="solid">Solid Line</option>
          <option value="dashed">Dashed Line</option>
        </select>

        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="p-1 border border-gray-300 rounded"
        >
          <option value={2}>2px</option>
          <option value={4}>4px</option>
          <option value={6}>6px</option>
          <option value={8}>8px</option>
          <option value={10}>10px</option>
        </select>

        <button
          onClick={toggleDrawingMode}
          className={`px-2 py-1 rounded ${
            isDrawingMode || !selectedIcon
              ? "bg-green-500 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          {isDrawingMode || !selectedIcon ? "Ready to draw" : "Enable drawing"}
        </button>

        <button
          onClick={toggleDeleteMode}
          className={`px-2 py-1 rounded ${
            isDeleteMode
              ? "bg-red-500 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          {isDeleteMode ? "Stop Deleting" : "Delete Drawing"}
        </button>
        <button
          onClick={handleSaveDrawings}
          className="px-2 py-1 bg-white border border-gray-300 rounded"
        >
          Save Drawings
        </button>

        {/* Display current zoom level */}
        <ZoomLevelDisplay onZoomChange={setZoomLevel} />
      </div>
    </MapContainer>
  );
};

export default Map;
