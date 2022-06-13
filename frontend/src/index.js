import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

ReactDOM.render(root);

reportWebVitals();
