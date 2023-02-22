import { createAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type FlashState = {
  message: { title: string; content: string } | null;
};

const initialState: FlashState = {
  message: null,
};

export const setMessage = createAction<
  { title: string; content: string },
  "flash/setMessage"
>("flash/setMessage");
export const dismissMessage = createAction<void, "flash/dismissMessage">(
  "flash/dismissMessage"
);

export const flashSlice = createSlice({
  name: "flash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setMessage, (_state, action) => {
        return {
          message: action.payload,
        };
      })
      .addCase(dismissMessage, (_state, _action) => {
        return {
          message: null,
        };
      });
  },
});

export const selectFlashMessage = (state: RootState) => state.flash.message;

export default flashSlice.reducer;
