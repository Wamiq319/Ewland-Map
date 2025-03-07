import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMarker,
  initializeMarkers,
  setSelectedMarker,
  clearSelectedMarker,
} from "../redux/markerSlice";
import { FaPencilAlt, FaTrash, FaEyeSlash } from "react-icons/fa";

const InfoBox = () => {
  const dispatch = useDispatch();
  const selectedMarker = useSelector((state) => state.markers.selectedMarker);
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(selectedMarker?.headline || "");
  const [description, setDescription] = useState(
    selectedMarker?.description || ""
  );

  // If no marker is selected, return an empty div
  if (!selectedMarker)
    return (
      <div className="w-96 bg-white m-2 shadow-md rounded-lg p-4 border border-gray-300"></div>
    );

  // Handle saving the edited marker
  const handleSave = () => {
    dispatch(
      updateMarker({
        x: selectedMarker.x,
        y: selectedMarker.y,
        headline,
        description,
      })
    );
    setHeadline("");
    setDescription("");
    setIsEditing(false);
  };

  // Save marker to local storage and simulate saving to the backend
  const handleSaveToBackend = () => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    const existingMarkerIndex = savedMarkers.findIndex(
      (m) => m.id === selectedMarker.id
    );

    if (existingMarkerIndex !== -1) {
      // Update existing marker
      savedMarkers[existingMarkerIndex] = selectedMarker;
    } else {
      // Add new marker
      savedMarkers.push(selectedMarker);
    }

    localStorage.setItem("markers", JSON.stringify(savedMarkers));
    console.log("Marker saved to local storage:", selectedMarker);

    // Simulate saving to the backend
    alert("Marker saved");
  };

  // Delete marker from local storage and simulate deleting from the backend
  const handleDeleteFromBackend = () => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    const updatedMarkers = savedMarkers.filter(
      (m) => m.id !== selectedMarker.id
    );

    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    console.log("Marker deleted from local storage:", selectedMarker);

    // Reinitialize markers in the Redux state
    dispatch(initializeMarkers());

    // Simulate deleting from the backend
    alert("Marker deleted");
  };

  return (
    <div className="w-96 m-2 bg-white my-4 shadow-md rounded-lg p-4 border border-gray-300">
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder="Enter Project Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={description}
            placeholder="Enter Project Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2 h-32" // h-32 sets height to 8rem (128px)
          />
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-1 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className=" Side-bar text-lg font-bold text-gray-800 max-h-14 overflow-auto">
              {selectedMarker.headline}
            </h2>
            <div className="flex gap-2">
              <FaPencilAlt
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => setIsEditing(true)}
              />
              {/* <FaTrash
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={handleDeleteFromBackend} // Delete marker from backend and local storage
              /> */}
              <FaEyeSlash
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => dispatch(clearSelectedMarker())} // Delete marker from backend and local storage
              />
            </div>
          </div>
          <p className=".Side-bar text-sm text-gray-600 mt-2 max-h-40 overflow-auto ">
            {selectedMarker.description}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveToBackend}
              className="bg-green-500 text-white px-4 py-1 rounded mr-2"
            >
              Save Marker
            </button>
            <button
              onClick={handleDeleteFromBackend}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete Marker
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoBox;
