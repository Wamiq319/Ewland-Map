import React from "react";

const Sidebar = ({ setSelectedIcon, icons, selectedIcon }) => {
  return (
    <div className="sidebar   h-[400px] m-2 bg-gray-800 text-white p-1 rounded-md shadow-lg">
      <div className="flex flex-col  mt-4">
        {icons.map((icon, index) => (
          <button
            key={index}
            onClick={() => setSelectedIcon(icon)}
            className={`p-2 w-10 h-10 rounded-full border-2 ${
              selectedIcon === icon ? "border-red-500" : "border-transparent"
            }`}
          >
            <img src={icon} alt="icon" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
