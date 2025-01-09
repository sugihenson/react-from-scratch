import ReactDOM from "react-dom/client";
import React from "react";
import ItemList from "./item_list.js";
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
