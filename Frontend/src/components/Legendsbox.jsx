// InfoBox.js
import React from "react";
import { Railway, Roads, WaterWays, Borders } from "../assets";

const Legendsbox = () => {
  // Array of icon and name pairs
  const icons = [
    { icon: Railway, name: "RailwayLines" },
    { icon: Roads, name: "Roads" },
    { icon: WaterWays, name: "WaterWays" },
    { icon: Borders, name: "Borders" },
  ];

  return (
    <div className="Side-bar w-80 overflow-x-hidden overflow-y-auto  m-2 max-h-[500px] bg-white my-4 shadow-md rounded-lg p-4 border border-gray-300 ">
      {/* Grid container with 3 columns */}
      <div className="">
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
