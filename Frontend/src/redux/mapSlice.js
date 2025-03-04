import { createSlice } from "@reduxjs/toolkit";

// Load markers from localStorage (temporary solution)
const loadMarkersFromLocalStorage = () => {
  const markers = localStorage.getItem("markers");
  return markers ? JSON.parse(markers) : [];
};

const initialState = {
  markers: loadMarkersFromLocalStorage(), // Load markers from localStorage
  selectedMarker: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addMarker: (state, action) => {
      state.markers.push(action.payload);
      state.selectedMarker = action.payload;

      // Log the new marker to the console (simulate saving to backend)
      console.log("Saving new marker to backend:", action.payload);

      // Save markers to localStorage (temporary solution)
      localStorage.setItem("markers", JSON.stringify(state.markers));
    },
    updateMarker: (state, action) => {
      const marker = state.markers.find(
        (m) => m.x === action.payload.x && m.y === action.payload.y
      );
      if (marker) {
        marker.headline = action.payload.headline;
        marker.description = action.payload.description;

        // Log the updated marker to the console (simulate updating in backend)
        console.log("Updating marker in backend:", marker);

        // Save markers to localStorage (temporary solution)
        localStorage.setItem("markers", JSON.stringify(state.markers));
      }
    },
    deleteMarker: (state, action) => {
      state.markers = state.markers.filter(
        (m) => m.x !== action.payload.x && m.y !== action.payload.y
      );
      state.selectedMarker = null;

      // Log the deleted marker to the console (simulate deleting from backend)
      console.log("Deleting marker from backend:", action.payload);

      // Save markers to localStorage (temporary solution)
      localStorage.setItem("markers", JSON.stringify(state.markers));
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
  },
});

export const { addMarker, updateMarker, deleteMarker, setSelectedMarker } =
  mapSlice.actions;
export default mapSlice.reducer;
