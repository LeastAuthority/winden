import "@ionic/vue";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import CodeInputProvider from "./components/providers/CodeInputProvider";
import ErrorProvider from "./components/providers/ErrorProvider";
import WormholeProvider from "./components/providers/WormholeProvider";

ReactDOM.render(
  <ErrorProvider>
    <CodeInputProvider>
      <WormholeProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </WormholeProvider>
    </CodeInputProvider>
  </ErrorProvider>,
  document.querySelector("#app")
);
