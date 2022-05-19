import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./components/App";
import Background from "./components/Background";
import { WormholeProvider } from "./WormholeProvider";

ReactDOM.render(
  <WormholeProvider>
    <HashRouter>
      <Background />
      <App />
    </HashRouter>
  </WormholeProvider>,
  document.querySelector("#app")
);
