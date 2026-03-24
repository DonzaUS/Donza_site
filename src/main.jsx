import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CurrencyProvider } from "./context/CurrencyContext";
import "bootstrap/dist/css/bootstrap.min.css"; // подключаем Bootstrap
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </BrowserRouter>
);