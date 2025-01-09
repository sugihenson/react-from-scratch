import ReactDOM from "react-dom/client";
import React from "react";
import Weather from "./weather.js";

function App() {
  return (
    <div>
      <Weather />
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
