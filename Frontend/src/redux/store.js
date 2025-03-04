import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice"; // Import the map slice

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
