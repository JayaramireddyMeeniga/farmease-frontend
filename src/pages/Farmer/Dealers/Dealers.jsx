import React from 'react';

const Dealers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Connect with Dealers</h1>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700">Your Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Crop Type</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter crop type"
              />
            </div>
            <div>
              <label className="block text-gray-700">Quantity (in kg)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter quantity"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dealers;