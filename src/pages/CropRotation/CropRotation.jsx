import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faLeaf, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toast";

const CropRotationPlanner = () => {
  const [rotations, setRotations] = useState([
    { id: 1, year: "Year 1", crops: ["Wheat", "Legumes", "Corn"] },
    { id: 2, year: "Year 2", crops: ["Corn", "Wheat", "Legumes"] },
  ]);

  const [newRotation, setNewRotation] = useState({ year: "", crops: "" });
  const [editId, setEditId] = useState(null);

  const addRotation = () => {
    if (!newRotation.year.trim() || !newRotation.crops.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editId) {
      setRotations((prev) =>
        prev.map((rotation) =>
          rotation.id === editId
            ? { ...rotation, year: newRotation.year, crops: newRotation.crops.split(",") }
            : rotation
        )
      );
      setEditId(null);
    } else {
      const rotation = {
        id: rotations.length + 1,
        year: newRotation.year,
        crops: newRotation.crops.split(","),
      };
      setRotations([...rotations, rotation]);
    }

    setNewRotation({ year: "", crops: "" });
  };

  const editRotation = (rotation) => {
    setNewRotation({ year: rotation.year, crops: rotation.crops.join(",") });
    setEditId(rotation.id);
  };

  const deleteRotation = (id) => {
    if (window.confirm("Are you sure you want to delete this rotation?")) {
      setRotations(rotations.filter((rotation) => rotation.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-r from-green-50 to-green-100">
      <h1 className="text-4xl font-bold text-green-800 mb-6 flex items-center">
        <FontAwesomeIcon icon={faLeaf} className="mr-3 text-green-600" /> Crop Rotation Planner
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Crop rotation is a farming practice where different crops are planted in the same area
            across a sequence of growing seasons. It helps improve soil health, reduce pests, and
            increase crop yield. Use this planner to organize and manage your crop rotations
            effectively.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            {editId ? "Edit Rotation" : "Add New Rotation"}
          </h2>
          <input
            type="text"
            value={newRotation.year}
            onChange={(e) => setNewRotation({ ...newRotation, year: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-2"
            placeholder="Year (e.g., Year 1)"
          />
          <input
            type="text"
            value={newRotation.crops}
            onChange={(e) => setNewRotation({ ...newRotation, crops: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-2"
            placeholder="Crops (comma separated, e.g., Wheat, Legumes, Corn)"
          />
          <button
            onClick={addRotation}
            className={`mt-2 text-white py-2 px-4 rounded-lg ${editId ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            {editId ? "Update Rotation" : "Add Rotation"}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-4">Current Rotations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {rotations.map((rotation) => (
            <div key={rotation.id} className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-500">
              <h2 className="text-xl font-bold text-green-800">{rotation.year}</h2>
              <p className="text-gray-600">Crops: <span className="text-green-700 font-semibold">{rotation.crops.join(", ")}</span></p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => editRotation(rotation)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => deleteRotation(rotation.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropRotationPlanner;