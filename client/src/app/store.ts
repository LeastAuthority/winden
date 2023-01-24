import { configureStore } from "@reduxjs/toolkit";
import wormholeSlice from "./wormholeSlice";

export const store = configureStore({
  reducer: {
    wormhole: wormholeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
