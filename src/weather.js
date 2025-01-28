import React, { useEffect, useState } from "react";
import "./stylesheet.css";

export default function Weather() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState("");
  const [savedForecasts, setSavedForecasts] = useState([]);

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

  // testing useEffect - updates the message when the user types in the text input
  useEffect(() => {
    city
      ? setMessage(`The weather in ${city} is:`)
      : setMessage("Please enter a city and click 'Get Weather'");
  }, [city]);

  // Fetch saved forecasts from the backend when the component mounts
  useEffect(() => {
    const fetchSavedForecasts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/forecasts");
        if (!response.ok) {
          throw new Error("Failed to fetch saved forecasts");
        }
        const data = await response.json();
        setSavedForecasts(data); // Store fetched forecasts in state
      } catch (error) {
        console.error("Error fetching saved forecasts:", error);
      }
    };

    fetchSavedForecasts(); // Call the function to fetch saved forecasts when the component mounts
  }, []);

  const handleSaveForecast = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/forecasts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: city, // From your input or fetched data
          weather: weather.WeatherText, // From fetched forecast data
          temperature: weather.Temperature.Metric.Value, // From fetched forecast data
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save forecast");
      }

      const data = await response.json();
      console.log("Forecast saved:", data.forecast);
      // Add the new forecast to the savedForecasts array without fetching from the API again
      // spread operator (...) to copy the previous forecasts and add the new forecast
      setSavedForecasts((prevForecasts) => [...prevForecasts, data.forecast]);
    } catch (error) {
      console.error("Error saving forecast:", error);
    }
  };

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
            <button onClick={handleSaveForecast}>Save weather</button>
          </div>
        )}
      </div>
      <div className="weatherCard">
        <h2 className="weatherH2">Saved Forecasts</h2>
        <div>
          {/* if savedForecasts is greater than 0: */}
          {savedForecasts.length > 0 ? (
            <ul>
              {/* iterate over savedForecasts and create an <li> for each one */}
              {savedForecasts.map((forecast, index) => (
                // key prop is required when rendering a list of elements, helps React identify which items have changed, are added, or are removed
                <li key={index}>
                  <strong>{forecast.city}</strong>
                  <br />
                  Weather: {forecast.weather}
                  <br />
                  Temperature: {forecast.temperature}°C
                </li>
              ))}
            </ul>
          ) : (
            // if savedForecasts is empty:
            <p>No saved forecasts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
