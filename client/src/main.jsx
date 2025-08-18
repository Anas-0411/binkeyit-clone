import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./store/store.js";
import router from "./routes/index.routes.jsx";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element with ID 'root' not found.");
}

const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
