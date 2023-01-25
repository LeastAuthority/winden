import "@ionic/vue";
import "./wasm_exec.js";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import ErrorProvider from "./components/providers/ErrorProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import "./NoSleep";
import { store } from "./store";

ReactDOM.render(
  <ThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector("#app")
);
