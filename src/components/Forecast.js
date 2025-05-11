import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({weather,timestamp}) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (!data.city) return; // Don't fetch if no city is selected
      
      const apiKey = "7b0385f3951c4410d15b080cf19f89e2"; // OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(data.city)}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        if (response.data && response.data.list) {
          // Process the forecast data to get daily forecasts
          const dailyForecasts = response.data.list.reduce((acc, item) => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = {
                time: item.dt,
                temperature: {
                  minimum: item.main.temp_min,
                  maximum: item.main.temp_max
                },
                condition: {
                  description: item.weather[0].description,
                  icon_url: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                }
              };
            }
            return acc;
          }, {});
          
          setForecastData(Object.values(dailyForecasts));
        } else {
          console.log("No forecast data available");
          setForecastData([]);
        }
      } catch (error) {
        console.log("Error fetching forecast data:", error);
        setForecastData([]);
      }
    };

    fetchForecastData();
  }, [data.city]);

  useEffect(() => {
    if (data.temperature && data.temperature.current) {
      const currentTemp = data.temperature.current;
      if (currentTemp > 30) {
        alert("It's quite hot outside! Stay hydrated.");
      } else if (currentTemp < 10) {
        alert("It's cold outside! Wear warm clothes.");
      } else {
        alert("The weather is mild. Have a great day!");
      }
    }
  }, [data.temperature?.current]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };



  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
         
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
        <span> |{timestamp} |</span>
      </div>
      <div className="temp">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.temperature.current)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.condition.description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40" />
          <div>
            <p className="wind">{data.wind.speed}m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40" />
          <div>
            <p className="humidity">{data.temperature.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData &&
            forecastData.slice(0, 5).map((day) => (
              <div className="day" key={day.time}>
                <p className="day-name">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;