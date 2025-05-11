import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  
  const [query, setQuery] = useState(""); // City name input state
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  // State to store the latitude, longitude, and timestamp
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lon: null,
  });
  const [timestamp, setTimestamp] = useState(null); // Localized time for the location

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
      }`;
    return date;
  };

  // Fetch timestamp based on latitude and longitude
  const fetchTimestamp = async (lat, lon) => {
    const apiKey = "HZKKJ9C4E9VZ"; 
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.status === "OK" && response.data.formatted) {
        const localTime = response.data.formatted;
        setTimestamp(localTime);
        console.log("Timestamp for the location:", localTime);
      } else {
        // Fallback to local time if API fails
        const localTime = new Date().toLocaleTimeString();
        setTimestamp(localTime);
        console.log("Using local time as fallback:", localTime);
      }
    } catch (error) {
      console.error("Error fetching timestamp:", error);
      // Fallback to local time if API fails
      const localTime = new Date().toLocaleTimeString();
      setTimestamp(localTime);
      console.log("Using local time as fallback:", localTime);
    }
  };

  // Function to fetch weather data directly using city name
  const getWeatherData = async (cityName) => {
    const apiKey = "7b0385f3951c4410d15b080cf19f89e2"; // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        const weatherData = {
          city: response.data.name,
          country: response.data.sys.country,
          temperature: {
            current: response.data.main.temp,
            humidity: response.data.main.humidity
          },
          condition: {
            description: response.data.weather[0].description,
            icon_url: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          },
          wind: {
            speed: response.data.wind.speed
          }
        };
        setWeather({ data: weatherData, loading: false, error: false });
        
        // Fetch timestamp for the city's coordinates
        fetchTimestamp(response.data.coord.lat, response.data.coord.lon);
        return true;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather({ ...weather, loading: false, error: true });
      return false;
    }
  };

  // New search function
  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true, error: false });
      await getWeatherData(query);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "7b0385f3951c4410d15b080cf19f89e2"; // OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        const weatherData = {
          city: response.data.name,
          country: response.data.sys.country,
          temperature: {
            current: response.data.main.temp,
            humidity: response.data.main.humidity
          },
          condition: {
            description: response.data.weather[0].description,
            icon_url: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          },
          wind: {
            speed: response.data.wind.speed
          }
        };
        setWeather({ data: weatherData, loading: false, error: false });
        
        // Fetch timestamp for Mumbai's coordinates
        fetchTimestamp(response.data.coord.lat, response.data.coord.lon);
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []); // Empty array ensures this runs only once on mount

  return (
    <div className="App">
      {/* SearchEngine component */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching...</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry, city not found. Please try again.
            </span>
          </span>
        </>
      )}

      {weather.data && weather.data.condition && (
        <>
          <Forecast weather={weather} toDate={toDate} timestamp={timestamp} />
        </>
      )}
    </div>
  );
}

export default App;
