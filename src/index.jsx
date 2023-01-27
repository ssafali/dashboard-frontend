import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import SettingsContextProvider from './context/settings.context'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
  <Router>
    <AuthProviderWrapper>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </AuthProviderWrapper>
  </Router>
  //</React.StrictMode>

);
