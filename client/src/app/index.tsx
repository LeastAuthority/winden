import "@ionic/vue";
//
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import { ErrorProvider } from "./components/providers/ErrorProvider";
import { WormholeProvider } from "./components/providers/WormholeProvider";

ReactDOM.render(
  <ErrorProvider>
    <WormholeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </WormholeProvider>
  </ErrorProvider>,
  document.querySelector("#app")
);
