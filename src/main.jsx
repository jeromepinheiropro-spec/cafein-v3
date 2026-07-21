import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Moderation from "./pages/Moderation.jsx";
import "./index.css";

/* Safari (WebKit) peine sur les gros flous et le grain animé :
   on le marque pour lui servir une version allégée via CSS. */
if (typeof navigator !== "undefined" && navigator.vendor && navigator.vendor.startsWith("Apple")) {
  document.documentElement.classList.add("is-safari");
}

/* Sous-domaine réservé à l'équipe : admin.cafein.lu sert directement le
   back-office (sans le site vitrine), tandis que le domaine principal sert
   le site normal. Le sous-domaine pointe vers le même service Railway, donc
   les appels /api/* fonctionnent à l'identique. */
const isAdminHost =
  typeof window !== "undefined" && /^admin\./i.test(window.location.hostname);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdminHost ? (
      <BrowserRouter>
        <div className="min-h-screen bg-cream">
          <Moderation />
        </div>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </React.StrictMode>
);
