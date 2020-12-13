import React from "react";
import { render } from "react-dom";

import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";

import App from "./App";

const GlobalStyle = createGlobalStyle({
  "html, body, #root": {
    width: "100%",
    height: "100%",
  },
});

render(
  <>
    <Reset />
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
