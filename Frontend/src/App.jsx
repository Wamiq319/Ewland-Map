import React, { useEffect } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import InfoBox from "./components/Infobox";
import Legendsbox from "./components/Legendsbox";
import { useDispatch } from "react-redux";

import {
  map,
  location,
  airport,
  port,
  AgricultureZone,
  IndustrialZone,
  PowePlant,
} from "./assets";

const App = () => {
  const [selectedIcon, setSelectedIcon] = React.useState(null);
  const icons = [
    map,
    location,
    airport,
    port,
    AgricultureZone,
    IndustrialZone,
    PowePlant,
  ];
  const dispatch = useDispatch();

  // Simulate loading markers from backend
  useEffect(() => {
    console.log("Loading markers from backend...");
    // You can dispatch an action here to load markers from localStorage or a backend API
  }, []);

  return (
    <div className="flex">
      <Sidebar
        setSelectedIcon={setSelectedIcon}
        icons={icons}
        selectedIcon={selectedIcon}
      />
      <Map selectedIcon={selectedIcon} />
      <div className="flex flex-col">
        <InfoBox />
        <Legendsbox />
      </div>
    </div>
  );
};

export default App;
