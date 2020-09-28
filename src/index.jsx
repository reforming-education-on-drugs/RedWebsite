import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./pages/App";
import "./components/Analytics";
// import './styles/styles.scss';
import "./styles/styles_test.css";
import "./assets/images/favicon.ico";

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("app")
);
