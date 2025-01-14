import React, { useEffect, useState } from "react";
import "./stylesheet.css";

export default function Weather() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");

  // Only 50 requests per day are allowed with the free API key
  const awApiKey = process.env.WEATHER_API_KEY;

  // Accuweather API requires a location key to get the current weather
  // async functions do not require .then chaining and are easier to read and catch errors
  const fetchLocation = async (apiKey, city) => {
    // try block can catch errors in the fetch request and sends them to the catch block
    try {
      const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
      // fetch returns a promise that resolves into a response object
      const response = await fetch(locationUrl);
      if (!response.ok) {
        // Error thrown to the catch block
        throw new Error("Location not found");
      }
      //Parse the response object (data) to JSON;
      //The .json() method is asynchronous and returns a promise that resolves into the JSON object
      const data = await response.json();
      // The first object in the data array is the best match to the search query (city)
      return data[0];
    } catch (error) {
      // errors thrown in the try block are caught here
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const handleClick = async () => {
    try {
      // fetchLocation retrieves the Accuweather location object for the city
      const location = await fetchLocation(awApiKey, city);
      if (!location) {
        //errors are thrown to the catch block
        throw new Error("Location could not be retrieved.");
      }
      const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=${awApiKey}&metric=true`;
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
        throw new Error("Error fetching weather data");
      }
      const weatherData = await weatherResponse.json();
      setWeather(weatherData[0]);
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  // useEffect(() => {
  //   setMessage(`The weather in ${city} is:`);
  // }, [city]);

  return (
    <div className="weatherContainer">
      <div className="weatherCard">
        <h2 className="weatherH2">Weather</h2>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          className="weatherInput"
        />
        <button onClick={handleClick} className="weatherButton">
          Get Weather
        </button>
        <p>{message}</p>
        {/* checks if weather is not null/undefined before returning elements */}
        {weather && (
          <div className="weatherInfo">
            <h3>{weather.WeatherText}</h3>
            <p>{weather.Temperature.Metric.Value}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}
