import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

const IrrigationManagement = () => {
  const [irrigationSchedules, setIrrigationSchedules] = useState([
    { id: 1, crop: "Wheat", area: "10 acres", schedule: "Every 2 days" },
    { id: 2, crop: "Corn", area: "5 acres", schedule: "Every 3 days" },
    { id: 3, crop: "Rice", area: "15 acres", schedule: "Every 1 day" },
    { id: 4, crop: "Soybean", area: "8 acres", schedule: "Every 4 days" },
    { id: 5, crop: "Barley", area: "6 acres", schedule: "Every 5 days" },
    { id: 6, crop: "Tomato", area: "4 acres", schedule: "Every 2 days" },
    { id: 7, crop: "Potato", area: "12 acres", schedule: "Every 3 days" },
    { id: 8, crop: "Sugarcane", area: "20 acres", schedule: "Every 1 day" },
    { id: 9, crop: "Cotton", area: "7 acres", schedule: "Every 5 days" },
    { id: 10, crop: "Peanuts", area: "9 acres", schedule: "Every 4 days" },
    { id: 11, crop: "Onion", area: "6 acres", schedule: "Every 2 days" },
    { id: 12, crop: "Garlic", area: "5 acres", schedule: "Every 3 days" },
    { id: 13, crop: "Carrot", area: "7 acres", schedule: "Every 2 days" },
    { id: 14, crop: "Lettuce", area: "3 acres", schedule: "Every 1 day" },
    { id: 15, crop: "Cabbage", area: "4 acres", schedule: "Every 2 days" },
    { id: 16, crop: "Strawberry", area: "2 acres", schedule: "Every 1 day" },
    { id: 17, crop: "Apple", area: "15 acres", schedule: "Every 7 days" },
    { id: 18, crop: "Orange", area: "10 acres", schedule: "Every 6 days" },
    { id: 19, crop: "Grapes", area: "12 acres", schedule: "Every 5 days" },
    { id: 20, crop: "Banana", area: "18 acres", schedule: "Every 4 days" },
    { id: 21, crop: "Pineapple", area: "8 acres", schedule: "Every 5 days" },
    { id: 22, crop: "Mango", area: "20 acres", schedule: "Every 6 days" },
    { id: 23, crop: "Papaya", area: "9 acres", schedule: "Every 3 days" },
    { id: 24, crop: "Cucumber", area: "5 acres", schedule: "Every 2 days" },
    { id: 25, crop: "Pumpkin", area: "7 acres", schedule: "Every 4 days" },
    { id: 26, crop: "Spinach", area: "3 acres", schedule: "Every 1 day" },
    { id: 27, crop: "Broccoli", area: "6 acres", schedule: "Every 2 days" },
    { id: 28, crop: "Peas", area: "4 acres", schedule: "Every 3 days" },
    { id: 29, crop: "Chili", area: "6 acres", schedule: "Every 3 days" },
    { id: 30, crop: "Watermelon", area: "10 acres", schedule: "Every 5 days" },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    crop: "",
    area: "",
    schedule: "",
  });
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchQuery, setSearchQuery] = useState("");
  const [filterArea, setFilterArea] = useState("");

  const addSchedule = () => {
    if (!newSchedule.crop || !newSchedule.area || !newSchedule.schedule) {
      alert("Please fill in all fields.");
      return;
    }

    if (editId) {
      setIrrigationSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editId ? { ...schedule, ...newSchedule } : schedule,
        ),
      );
      setEditId(null);
    } else {
      const schedule = { id: irrigationSchedules.length + 1, ...newSchedule };
      setIrrigationSchedules([...irrigationSchedules, schedule]);
    }

    setNewSchedule({ crop: "", area: "", schedule: "" });
  };

  const editSchedule = (schedule) => {
    setNewSchedule(schedule);
    setEditId(schedule.id);
  };

  const deleteSchedule = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setIrrigationSchedules(
        irrigationSchedules.filter((schedule) => schedule.id !== id),
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredSchedules = irrigationSchedules.filter((schedule) => {
    const matchesSearch = schedule.crop
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterArea ? schedule.area === filterArea : true;
    return matchesSearch && matchesFilter;
  });

  const currentSchedules = filteredSchedules.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col px-4 py-2 bg-green-50">
      <h1 className="text-2xl font-semibold text-green-800 mb-3">
        Irrigation Management
      </h1>

      <div className="bg-white px-4 pb-4 pt-3 rounded-lg shadow-lg">
        <h2 className="text-xl font-medium text-green-700 mb-3">
          {editId ? "Edit Schedule" : "Add New Schedule"}
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={newSchedule.crop}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, crop: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-2"
            placeholder="Crop"
          />
          <input
            type="text"
            value={newSchedule.area}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, area: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-2"
            placeholder="Area"
          />
          <input
            type="text"
            value={newSchedule.schedule}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, schedule: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-2"
            placeholder="Schedule"
          />
          <button
            onClick={addSchedule}
            className={`mt-2 text-white py-2 px-4 rounded-lg ${editId ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {editId ? "Update Schedule" : "Add Schedule"}
          </button>
        </div>

        <h2 className="text-xl font-medium text-green-700 mb-3">
          Current Schedules
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Search by crop..."
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-3 text-gray-400"
            />
          </div>
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Filter by Area</option>
            <option value="2 acres">2 acres</option>
            <option value="3 acres">3 acres</option>
            <option value="4 acres">4 acres</option>
            <option value="5 acres">5 acres</option>
            <option value="6 acres">6 acres</option>
            <option value="7 acres">7 acres</option>
            <option value="8 acres">8 acres</option>
            <option value="9 acres">9 acres</option>
            <option value="10 acres">10 acres</option>
            <option value="12 acres">12 acres</option>
            <option value="15 acres">15 acres</option>
            <option value="18 acres">18 acres</option>
            <option value="20 acres">20 acres</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-100">
                <th className="p-3">Crop</th>
                <th className="p-3">Area</th>
                <th className="p-3">Schedule</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSchedules.map((schedule) => (
                <tr key={schedule.id} className="border-b hover:bg-green-50">
                  <td className="p-3">{schedule.crop}</td>
                  <td className="p-3">{schedule.area}</td>
                  <td className="p-3">{schedule.schedule}</td>
                  <td className="p-3">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => editSchedule(schedule)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => deleteSchedule(schedule.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          {Array.from(
            { length: Math.ceil(filteredSchedules.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default IrrigationManagement;
