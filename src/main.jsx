import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

/* Safari (WebKit) peine sur les gros flous et le grain animé :
   on le marque pour lui servir une version allégée via CSS. */
if (typeof navigator !== "undefined" && navigator.vendor && navigator.vendor.startsWith("Apple")) {
  document.documentElement.classList.add("is-safari");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
