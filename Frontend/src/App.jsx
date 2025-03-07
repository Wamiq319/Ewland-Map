import React, { useEffect } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import InfoBox from "./components/Infobox";
import Legendsbox from "./components/Legendsbox";
import { useDispatch } from "react-redux";

import {
  AgricultureZone,
  Airport,
  CoalPowerPlant,
  CommodityStorage,
  GasPowerPlant,
  GoodsDepot,
  IndustrialZone,
  location,
  map,
  port,
  PowerPlant,
  RailwayStation,
  Shipyard,
  SolarPowerPlant,
  WaterPowerPlant,
} from "./assets";

const App = () => {
  const [selectedIcon, setSelectedIcon] = React.useState(null);
  const icons = [
    { icon: map, name: "Map" },
    { icon: RailwayStation, name: "Station" },
    { icon: location, name: "Location" },
    { icon: Airport, name: "Airport" },
    { icon: port, name: "Port" },
    { icon: Shipyard, name: "Shipyard" },
    { icon: GoodsDepot, name: "Goods Depot" },
    { icon: AgricultureZone, name: "Agriculture Zone" },
    { icon: IndustrialZone, name: "Industrial Zone" },
    { icon: PowerPlant, name: "Power Plant" },
    { icon: CoalPowerPlant, name: "Coal Plant" },
    { icon: GasPowerPlant, name: "Gas Plant" },
    { icon: SolarPowerPlant, name: "Solar Plant" },
    { icon: WaterPowerPlant, name: "Water Plant" },
    { icon: CommodityStorage, name: "Commodity Storage" },
  ];

  return (
    <div className="p-4">
      <div className="text-center ">
        <h1 className="text-3xl font-bold text-gray-800">Ewland Map</h1>
      </div>

      <div className="flex ">
        <div className="flex flex-col ">
          <InfoBox />
          <Sidebar
            setSelectedIcon={setSelectedIcon}
            icons={icons}
            selectedIcon={selectedIcon}
          />
        </div>
        <Map selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
        <Legendsbox />
      </div>
    </div>
  );
};

export default App;
