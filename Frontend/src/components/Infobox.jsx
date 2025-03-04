import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMarker, deleteMarker } from "../redux/mapSlice";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const InfoBox = () => {
  const dispatch = useDispatch();
  const selectedMarker = useSelector((state) => state.map.selectedMarker); // Listen to selectedMarker
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(selectedMarker?.headline || "");
  const [description, setDescription] = useState(
    selectedMarker?.description || ""
  );

  if (!selectedMarker)
    return (
      <div className="w-96 bg-white m-2 shadow-md rounded-lg p-4 border border-gray-300"></div>
    );

  const handleSave = () => {
    dispatch(
      updateMarker({
        x: selectedMarker.x,
        y: selectedMarker.y,
        headline,
        description,
      })
    );
    setIsEditing(false);
  };

  // Function to save marker to backend (simulated with console.log)
  const handleSaveToBackend = () => {
    console.log("Saving marker to backend:", selectedMarker);
    // Replace this with an actual API call to save the marker to the backend
  };

  // Function to delete marker from backend (simulated with console.log)
  const handleDeleteFromBackend = () => {
    console.log("Deleting marker from backend:", selectedMarker);
    // Replace this with an actual API call to delete the marker from the backend
  };

  return (
    <div className="w-96 m-2 bg-white my-4 shadow-md rounded-lg p-4 border border-gray-300">
      {isEditing ? (
        <>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={description}
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
            <h2 className="text-lg font-bold text-gray-800">
              {selectedMarker.headline}
            </h2>
            <div className="flex gap-2">
              <FaPencilAlt
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => setIsEditing(true)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => dispatch(deleteMarker(selectedMarker))} // Delete from frontend only
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
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
