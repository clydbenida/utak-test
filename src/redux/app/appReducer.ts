import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppStoreInitialState, ThemeMode } from "../../types/types";
import { APP } from "../constants";

const initialState: AppStoreInitialState = {
  themeMode: 'dark'
}

export const appSlice = createSlice({
  name: APP,
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    }
  }
});

export const { setThemeMode } = appSlice.actions

export default appSlice.reducer;
