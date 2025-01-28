import express from "express";
import cors from "cors"; // Import CORS middleware

const app = express();
const PORT = 5001;

//allow cross-origin requests
app.use(cors());

// Middleware for JSON parsing
// Parses incoming JSON payloads from HTTP requests and makes the data accessible via req.body
app.use(express.json());

const savedForecasts = [];

app.post("/api/forecasts", (req, res) => {
  const { city, weather, temperature } = req.body;

  // Validate the incoming data
  if (!city || !weather || temperature === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Save the forecast to the array
  const forecast = { city, weather, temperature };
  savedForecasts.push(forecast);

  // Respond with the saved forecast
  res.status(201).json({
    message: "Forecast saved successfully!",
    forecast,
  });
});

app.get("/api/forecasts", (req, res) => {
  res.json(savedForecasts);
});

// API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
