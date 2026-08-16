import React from "react";

const WeatherForeCast = () => {
  const weatherData = {
    temperature: "25°C",
    condition: "Sunny",
    humidity: "60%",
    wind: "10 km/h",
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-green-50">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Weather Forecast</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800">{weatherData.temperature}</h2>
          <p className="text-gray-600">{weatherData.condition}</p>
          <div className="mt-4">
            <p className="text-gray-600">Humidity: {weatherData.humidity}</p>
            <p className="text-gray-600">Wind: {weatherData.wind}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForeCast;