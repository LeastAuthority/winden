import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type WormholeState = {
  value: number;
};

const initialState: WormholeState = {
  value: 0,
};

export const wormholeSlice = createSlice({
  name: "wormhole",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  wormholeSlice.actions;

export const selectValue = (state: RootState) => state.wormhole.value;

export default wormholeSlice.reducer;
