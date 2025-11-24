import React, { useState } from "react";
import { fetchNearestCityName, fetchWeather } from "../utils/fetchWeather";

export default function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocationAndWeather = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setCoords(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        
        fetchWeather(latitude, longitude).then((data) => {
          console.log(data);
          fetchNearestCityName(latitude, longitude).then((cityName) => {
            if (cityName) data.name = cityName;
            setWeather(data);
            setLoading(false);
          });
        }).catch((error) => {
          setError(error.message);
          setLoading(false);
        });
      },
      (error) => {
        console.error(error);
        setError("Location permission denied or unavailable.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="app-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      <div className="weather-content">
        {!coords && !weather && !loading && (
          <button onClick={getLocationAndWeather}>Get Weather</button>
        )}

        {coords && weather && (
          <div className="weather-box">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Min: {weather.main.temp_min}°C, Max: {weather.main.temp_max}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
            <p>Weather: {weather.weather[0].main} ({weather.weather[0].description})</p>
            <p>Wind: {weather.wind.speed} m/s, Direction: {weather.wind.deg}°</p>
            <button onClick={getLocationAndWeather}>Refresh</button>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>Error: {error}</p>
            <button onClick={getLocationAndWeather}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}