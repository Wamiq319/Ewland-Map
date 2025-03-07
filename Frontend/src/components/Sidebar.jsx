import React from "react";

const Sidebar = ({ setSelectedIcon, icons, selectedIcon }) => {
  return (
    <div className="Side-bar w-96  m-2 h-[300px] bg-white  shadow-md rounded-lg p-2 border border-gray-300   overflow-x-hidden ">
      <div className="grid grid-cols-3 gap-1">
        {icons.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedIcon(item.icon)}
            className={`p-2 w-full flex items-center  ${
              selectedIcon === item.icon ? "text-red-500" : ""
            }`}
          >
            <img
              src={item.icon}
              alt="icon"
              className={`w-6 h-6  mr-2 ${
                selectedIcon === item.icon
                  ? "border-red-500 p-1"
                  : "border-transparent"
              } rounded-full border-2`}
            />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
