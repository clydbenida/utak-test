import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeMode } from "../../types/types";
import { APP } from "../constants";
import { AppStoreInitialState } from "../../types/redux";

const initialState: AppStoreInitialState = {
  themeMode: 'dark',
  selectedCategory: "All",
  confirmModal: {
    open: false,
  }
}

interface openConfirmModalParams {
  acceptCallback: () => void;
  declineCallback: () => void;
  message?: string;
}

export const appSlice = createSlice({
  name: APP,
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },

    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    openConfirmModal: (state, action: PayloadAction<openConfirmModalParams>) => {
      state.confirmModal.open = true;
      state.confirmModal.message = action.payload.message;
    },

    closeConfirmModal: (state) => {
      state.confirmModal.open = false;
      state.confirmModal.message = "";
    }
  }
});

export const { setThemeMode, selectCategory, openConfirmModal, closeConfirmModal } = appSlice.actions

export default appSlice.reducer;
