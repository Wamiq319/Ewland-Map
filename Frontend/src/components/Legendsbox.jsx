// InfoBox.js
import React from "react";
import {
  map,
  location,
  airport,
  port,
  AgricultureZone,
  IndustrialZone,
  PowePlant,
} from "../assets";

const Legendsbox = () => {
  // Array of icon and name pairs
  const icons = [
    { icon: map, name: "Map" },
    { icon: location, name: "Location" },
    { icon: airport, name: "Airport" },
    { icon: port, name: "Port" },
    { icon: AgricultureZone, name: "Agriculture Zone" },
    { icon: IndustrialZone, name: "Industrial Zone" },
    { icon: PowePlant, name: "Power Plant" },
  ];

  return (
    <div className="w-96 m-2 h-[300px] bg-white my-4 shadow-md rounded-lg p-4 border border-gray-300 overflow-y-auto">
      {/* Grid container with 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Map through the icons array and render each icon with its name */}
        {icons.map((item, index) => (
          <div key={index} className="flex items-center">
            {/* Icon on the left */}
            <img src={item.icon} alt={item.name} className="w-6 h-6 mr-2" />
            {/* Name on the right */}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legendsbox;
