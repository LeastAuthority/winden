import "@ionic/vue";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import CodeInputProvider from "./components/providers/CodeInputProvider";
import ErrorProvider from "./components/providers/ErrorProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import WormholeProvider from "./components/providers/WormholeProvider";

ReactDOM.render(
  <CodeInputProvider>
    <ThemeProvider>
      <ErrorProvider>
        <WormholeProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </WormholeProvider>
      </ErrorProvider>
    </ThemeProvider>
  </CodeInputProvider>,
  document.querySelector("#app")
);
