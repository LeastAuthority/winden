import "@ionic/vue";
//
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./components/App";
import Background from "./components/Background";
import { ErrorProvider } from "./components/ErrorProvider";
import { WormholeProvider } from "./components/WormholeProvider";

ReactDOM.render(
  <WormholeProvider>
    <ErrorProvider>
      <HashRouter>
        <Background />
        <App />
      </HashRouter>
    </ErrorProvider>
  </WormholeProvider>,
  document.querySelector("#app")
);
