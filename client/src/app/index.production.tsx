import "@ionic/vue";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import CodeInputProvider from "./components/providers/CodeInputProvider";
import ErrorProvider from "./components/providers/ErrorProvider";
import FlashProvider from "./components/providers/FlashProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import WormholeProvider from "./components/providers/WormholeProvider";
import "./NoSleep";

ReactDOM.render(
  <CodeInputProvider>
    <ThemeProvider>
      <ErrorProvider>
        <FlashProvider>
          <WormholeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WormholeProvider>
        </FlashProvider>
      </ErrorProvider>
    </ThemeProvider>
  </CodeInputProvider>,
  document.querySelector("#app")
);
