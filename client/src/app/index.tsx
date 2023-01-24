import "@ionic/vue";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import CodeInputProvider from "./components/providers/CodeInputProvider";
import ErrorProvider from "./components/providers/ErrorProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import WormholeProvider from "./components/providers/WormholeProvider";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import "./NoSleep";
import { store } from "./store";
import { decrement, increment, selectValue } from "./wormholeSlice";

ReactDOM.render(
  <CodeInputProvider>
    <ThemeProvider>
      <ErrorProvider>
        <WormholeProvider>
          <BrowserRouter>
            <Provider store={store}>
              <NewApp />
            </Provider>
          </BrowserRouter>
        </WormholeProvider>
      </ErrorProvider>
    </ThemeProvider>
  </CodeInputProvider>,
  document.querySelector("#app")
);

function NewApp() {
  const value = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
    </div>
  );
}
