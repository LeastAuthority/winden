import { createAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { detectErrorType, errorContent } from "./util/errors";

type ErrorState = {
  error: string | null;
};

const initialState: ErrorState = {
  error: null,
};

export const setError = createAction<string, "error/setError">(
  "error/setError"
);
export const dismissError = createAction<void, "error/dismissError">(
  "error/dismissError"
);

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setError, (_state, action) => {
        return {
          error: action.payload,
        };
      })
      .addCase(dismissError, (_state, _action) => {
        return {
          error: null,
        };
      });
  },
});

export const selectErrorContent = (state: RootState) =>
  state.error.error ? errorContent(detectErrorType(state.error.error)) : null;

export default errorSlice.reducer;
