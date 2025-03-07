import { createSlice } from "@reduxjs/toolkit";

// Load markers from localStorage on initial load
const loadMarkersFromLocalStorage = () => {
  const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
  return savedMarkers;
};

const initialState = {
  markers: loadMarkersFromLocalStorage(), // Initialize markers from localStorage
  selectedMarker: null,
};

const markerSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    // Add a new marker
    addMarker: (state, action) => {
      const newMarker = {
        ...action.payload,
        id: `${action.payload.x}-${action.payload.y}`, // Unique ID based on latitude and longitude
      };
      state.markers.push(newMarker);
      state.selectedMarker = newMarker;
    },

    // Update an existing marker
    updateMarker: (state, action) => {
      const marker = state.markers.find(
        (m) => m.id === `${action.payload.x}-${action.payload.y}`
      );
      if (marker) {
        marker.headline = action.payload.headline;
        marker.description = action.payload.description;
      }
    },

    // Delete a marker
    deleteMarker: (state, action) => {
      state.markers = state.markers.filter(
        (m) => m.id !== `${action.payload.x}-${action.payload.y}`
      );
      state.selectedMarker = null;
    },

    // Set the selected marker
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },

    // Clear the selected marker
    clearSelectedMarker: (state) => {
      state.selectedMarker = null;
    },

    // Initialize markers from localStorage
    initializeMarkers: (state) => {
      state.markers = loadMarkersFromLocalStorage();
    },
  },
});

export const {
  addMarker,
  updateMarker,
  deleteMarker,
  setSelectedMarker,
  clearSelectedMarker,
  initializeMarkers, // Export the new action
} = markerSlice.actions;

export default markerSlice.reducer;
