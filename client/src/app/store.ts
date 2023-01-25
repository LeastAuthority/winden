import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import errorSlice from "./errorSlice";
import { wormholeSaga } from "./sagas";
import wormholeSlice from "./wormholeSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    wormhole: wormholeSlice,
    error: errorSlice,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(wormholeSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
