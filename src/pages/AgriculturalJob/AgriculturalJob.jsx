import React, { useState } from 'react';

const FarmLaborMarketplace = () => {
  // const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(true);
  const [error, setError] = useState('');

  const [selectedLocation, setSelectedLocation] = useState('');
  const [requiredWorkers, setRequiredWorkers] = useState(1);
  const [taskType, setTaskType] = useState('Harvesting');
  const [workDates, setWorkDates] = useState({ startDate: '', endDate: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLaborers, setSelectedLaborers] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const availableLocations = [
    'North Field District',
    'South Agricultural Zone',
    'East Farming Region',
    'West Cultivation Area',
    'Central Plantation District'
  ];

  const availableTasks = [
    'Harvesting',
    'Planting',
    'Weeding',
    'Irrigation',
    'Cotton Picking',
    'Crop Monitoring',
    'Fertilizer Application'
  ];

  const mockLaborers = [
    { id: 1, name: 'John Doe', phone: '1234567890', rating: 4.8, dailyRate: 250, expertise: ['Harvesting', 'Planting'], availability: true },
    { id: 2, name: 'Jane Smith', phone: '2345678901', rating: 4.5, dailyRate: 230, expertise: ['Weeding', 'Harvesting'], availability: true },
    { id: 3, name: 'Robert Brown', phone: '3456789012', rating: 4.9, dailyRate: 270, expertise: ['Cotton Picking', 'Irrigation'], availability: true },
    { id: 4, name: 'Mary Johnson', phone: '4567890123', rating: 4.2, dailyRate: 220, expertise: ['Planting', 'Fertilizer Application'], availability: true },
    { id: 5, name: 'David Wilson', phone: '5678901234', rating: 4.7, dailyRate: 260, expertise: ['Crop Monitoring', 'Harvesting'], availability: true },
  ];

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleTaskChange = (e) => {
    setTaskType(e.target.value);
  };

  const handleDateChange = (e) => {
    setWorkDates({
      ...workDates,
      [e.target.name]: e.target.value
    });
  };

  const handleWorkerCountChange = (e) => {
    setRequiredWorkers(parseInt(e.target.value, 10));
  };

  const searchLaborers = (e) => {
    e.preventDefault();

    const filteredLaborers = mockLaborers.filter(laborer =>
      laborer.expertise.includes(taskType) &&
      laborer.availability === true
    );

    const sortedLaborers = [...filteredLaborers].sort((a, b) => b.rating - a.rating);

    setSearchResults(sortedLaborers);
    setSelectedLaborers([]);
  };

  const toggleLaborerSelection = (laborer) => {
    if (selectedLaborers.some(l => l.id === laborer.id)) {
      setSelectedLaborers(selectedLaborers.filter(l => l.id !== laborer.id));
    } else {
      if (selectedLaborers.length < requiredWorkers) {
        setSelectedLaborers([...selectedLaborers, laborer]);
      } else {
        setError(`You can only select up to ${requiredWorkers} laborers`);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const bookLaborers = () => {
    if (selectedLaborers.length === 0) {
      setError('Please select at least one laborer');
      return;
    }
    setBookingConfirmed(true);
  };

  const newBooking = () => {
    setSelectedLocation('');
    setRequiredWorkers(1);
    setTaskType('Harvesting');
    setWorkDates({ startDate: '', endDate: '' });
    setSearchResults([]);
    setSelectedLaborers([]);
    setBookingConfirmed(false);
  };

  // const handleLogout = () => {
  //   setIsFarmerLoggedIn(false);
  //   newBooking();
  //   setTimeout(() => setIsFarmerLoggedIn(true), 100);
  // };

  const calculateDays = () => {
    if (!workDates.startDate || !workDates.endDate) return 0;

    const start = new Date(workDates.startDate);
    const end = new Date(workDates.endDate);

    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const calculateTotalCost = () => {
    const days = calculateDays();
    return selectedLaborers.reduce((total, laborer) => total + (laborer.dailyRate * days), 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 text-white p-4">
          {/* <h1 className="text-2xl font-bold">Farm Labor Marketplace</h1> */}
          <p className="text-sm">Find and book agricultural laborers based on ratings and expertise</p>
        </div>

        {!bookingConfirmed ? (
          <div>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Book Agricultural Laborers</h2>
              {/* <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Logout
              </button> */}
            </div>

            <div className="p-4">
              {/* Search Form */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Search for Laborers</h3>
                <form onSubmit={searchLaborers} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <select
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        className="w-full p-2 border rounded"
                        required
                      >
                        <option value="">Select a location</option>
                        {availableLocations.map((location, idx) => (
                          <option key={idx} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Task Type</label>
                      <select
                        value={taskType}
                        onChange={handleTaskChange}
                        className="w-full p-2 border rounded"
                      >
                        {availableTasks.map((task, idx) => (
                          <option key={idx} value={task}>{task}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={workDates.startDate}
                          onChange={handleDateChange}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          value={workDates.endDate}
                          onChange={handleDateChange}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Number of Workers</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={requiredWorkers}
                        onChange={handleWorkerCountChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                  >
                    Search Available Laborers
                  </button>
                </form>
              </div>

              {/* Search Results */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Available Laborers</h3>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map(laborer => (
                      <div
                        key={laborer.id}
                        className={`border rounded p-4 cursor-pointer transition-colors ${selectedLaborers.some(l => l.id === laborer.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                          }`}
                        onClick={() => toggleLaborerSelection(laborer)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{laborer.name}</h4>
                          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                            ★
                            {laborer.rating.toFixed(1)}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">Expertise: {laborer.expertise.join(', ')}</p>
                        <p className="text-sm font-semibold text-gray-700">Rate: ₹{laborer.dailyRate}/day</p>
                      </div>
                    ))}
                  </div>
                ) : searchResults.length === 0 && selectedLocation ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-2">No laborers found matching your criteria.</p>
                    <p>Try changing your search parameters.</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Search for laborers to see results here.</p>
                  </div>
                )}

                {/* Selected Laborers Summary */}
                {selectedLaborers.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium mb-2">Selected Laborers: {selectedLaborers.length}/{requiredWorkers}</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedLaborers.map(laborer => (
                        <span key={laborer.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {laborer.name}
                        </span>
                      ))}
                    </div>

                    {workDates.startDate && workDates.endDate && (
                      <div className="mb-4 text-sm">
                        <p className="mb-1">Duration: {calculateDays()} days</p>
                        <p className="font-semibold text-lg">Total Cost: ₹{calculateTotalCost()}</p>
                      </div>
                    )}

                    <button
                      onClick={bookLaborers}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      Book Selected Laborers
                    </button>
                  </div>
                )}

                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Booking Confirmed</h2>
              {/* <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Logout
              </button> */}
            </div>

            <div className="p-6 text-center">
              <div className="mb-6">
                <div className="text-green-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Booking Successfully Confirmed!</h3>
              </div>

              <p className="mb-1">Notifications have been sent to all selected laborers.</p>
              <p className="mb-8">They will receive a reminder one day before the work date.</p>
            </div>

            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Booking Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Location:</span> {selectedLocation}</p>
                  <p><span className="font-medium">Task Type:</span> {taskType}</p>
                  <p><span className="font-medium">Work Period:</span> {workDates.startDate} to {workDates.endDate}</p>
                  <p><span className="font-medium">Duration:</span> {calculateDays()} days</p>
                  <p><span className="font-medium">Workers Booked:</span> {selectedLaborers.length}</p>
                  <p><span className="font-medium">Total Cost:</span> ₹{calculateTotalCost()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Booked Laborers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLaborers.map(laborer => (
                    <div key={laborer.id} className="border rounded p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{laborer.name}</h4>
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                          ★
                          {laborer.rating.toFixed(1)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Phone: {laborer.phone}</p>
                      <p className="text-sm font-semibold text-gray-700">Daily Rate: ₹{laborer.dailyRate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t p-4 text-center">
              <button
                onClick={newBooking}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
              >
                Create New Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmLaborMarketplace;