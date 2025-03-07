import { createSlice } from "@reduxjs/toolkit";

// Load drawings from localStorage on initial load
const loadDrawingsFromLocalStorage = () => {
  const savedDrawings = JSON.parse(localStorage.getItem("drawings")) || [];
  return savedDrawings;
};

const initialState = {
  drawings: loadDrawingsFromLocalStorage(), // Initialize drawings from localStorage
  selectedDrawing: null,
};

const drawingSlice = createSlice({
  name: "drawings",
  initialState,
  reducers: {
    // Add a new drawing
    addDrawing: (state, action) => {
      state.drawings.push(action.payload);
    },

    // Update an existing drawing
    updateDrawing: (state, action) => {
      const drawing = state.drawings.find((d) => d.id === action.payload.id);
      if (drawing) {
        Object.assign(drawing, action.payload);
      }
    },

    // Initialize drawings from localStorage
    initializeDrawings: (state) => {
      state.drawings = loadDrawingsFromLocalStorage();
    },
  },
});

export const {
  addDrawing,
  updateDrawing,
  deleteDrawing,
  setSelectedDrawing,
  initializeDrawings, // Export the new action
} = drawingSlice.actions;

export default drawingSlice.reducer;
