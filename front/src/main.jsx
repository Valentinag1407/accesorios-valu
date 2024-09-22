import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ValuProvider } from "./context/ValuContext.jsx";

createRoot(document.getElementById("root")).render(
  <ValuProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ValuProvider>
);
