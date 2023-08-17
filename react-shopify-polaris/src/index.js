import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@shopify/polaris/dist/styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
