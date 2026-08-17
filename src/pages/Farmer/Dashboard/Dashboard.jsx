import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardDetails from "./DashboardDetails";
import DashboardOverview from "./DashboardOverview";
import { API_KEY } from "./dashboardData";

const Dashboard = () => {
  const routeLocation = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [defaultCityLoaded, setDefaultCityLoaded] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showArrivalNotice, setShowArrivalNotice] = useState(
    Boolean(routeLocation.state?.justLoggedIn),
  );

  const fetchWeatherByCity = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(`City not found: ${data.message}`);
        return;
      }

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: `${Math.round(data.main.temp)} C`,
        condition: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} m/s`,
        isCurrentLocation: false,
      });
      setLocation("");
    } catch (weatherError) {
      setError(`Network error: ${weatherError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultCity = () => {
    if (!defaultCityLoaded) {
      fetchWeatherByCity("Hyderabad");
      setDefaultCityLoaded(true);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (!response.ok) {
        setError(`Error: ${data.message}`);
        loadDefaultCity();
        return;
      }

      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: `${Math.round(data.main.temp)} C`,
        condition: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} m/s`,
        isCurrentLocation: true,
      });
    } catch (weatherError) {
      setError(`Network error: ${weatherError.message}`);
      loadDefaultCity();
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported. Search by city instead.");
      loadDefaultCity();
      return;
    }

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (geoError) => {
        setError(
          geoError.code === 1
            ? "Location access denied. Search for a city manually."
            : "Location is unavailable. Search for a city manually.",
        );
        setLoading(false);
        loadDefaultCity();
      },
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 300000 },
    );
  };

  useEffect(() => {
    getCurrentLocationWeather();

    const timer = setTimeout(() => {
      if (!weatherData && !defaultCityLoaded && !loading) loadDefaultCity();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherByCity(location);
  };

  return (
    <div className="bg-(--fe-bg) px-4 pb-4 pt-5 text-(--fe-text) sm:px-4 lg:pr-7 lg:pl-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <DashboardOverview
          showArrivalNotice={showArrivalNotice}
          onDismissArrivalNotice={() => setShowArrivalNotice(false)}
        />

        <DashboardDetails
          weatherData={weatherData}
          location={location}
          loading={loading}
          error={error}
          showTransactions={showTransactions}
          onLocationChange={setLocation}
          onWeatherSubmit={handleSubmit}
          onCurrentLocationWeather={getCurrentLocationWeather}
          onToggleTransactions={() => setShowTransactions((value) => !value)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
