import ReactDOM from "react-dom/client";
import React from "react";
import ItemList from "./item_list.js";

function App() {
  return <ItemList />;
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
