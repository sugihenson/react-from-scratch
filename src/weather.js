import React, { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);

  // Only 50 requests per day are allowed with the free API key
  const apiKey = process.env.WEATHER_API_KEY;

  // Accuweather API requires a location key to get the current weather
  const locationResponse = fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
  );

  const locationData = locationResponse
    .then((response) => response.json())
    .then((data) => {
      // The first object in the data array is the best match to the search query (city)
      return data[0];
    });

  const handleClick = () => {
    locationData.then((location) => {
      const weatherResponse = fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=${apiKey}&metric=true`
      );
      weatherResponse
        .then((response) => response.json())
        .then((data) => {
          // The first (and only) object in the data array is the current weather
          setWeather(data[0]);
        });
    });
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <h2>Weather</h2>
      <input type="text" value={city} onChange={handleChange} />
      <button onClick={handleClick}>Get Weather</button>
      {/* checks if weather is not null/undefined before returning elements */}
      {weather && (
        <div>
          <h3>{weather.WeatherText}</h3>
          <p>{weather.Temperature.Metric.Value}°C</p>
        </div>
      )}
    </>
  );
}
