import React from "react";
import ReactDOM from "react-dom/client";
import "./normalize.css";
import "./index.scss";
import App from "./App";

// Получаем элемент с id "root"
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
