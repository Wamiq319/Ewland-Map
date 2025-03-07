import { configureStore } from "@reduxjs/toolkit";
import markerReducer from "./markerSlice";
import drawingReducer from "./drawingSlice";

const store = configureStore({
  reducer: {
    markers: markerReducer,
    drawings: drawingReducer,
  },
});

export default store;
