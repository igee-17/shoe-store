import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import "./index.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import Store from "./app/Store.js";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root"); // Make sure the element exists

if (rootElement) {
  createRoot(rootElement).render(
    // Use createRoot from react-dom/client
    <React.StrictMode>
      <Provider store={Store}>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          {" "}
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  );
}
