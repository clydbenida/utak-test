import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuItem } from "../../types/types";
import { APP } from "../constants";
import { AppStoreInitialState } from "../../types/redux";

const initialState: AppStoreInitialState = {
  selectedCategory: "All",
  confirmModal: {
    open: false,
  },
  search: {
    query: "",
    result: [],
  },
  loading: true,
  snackbar: {
    open: false,
    message: "",
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
    },

    onQueryChange: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      state.search.query = query;
    },

    assignSearchResult: (state, action: PayloadAction<MenuItem[]>) => {
      const query = action.payload;
      state.search.result = query;
    },

    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setSnackbar: (state, action: PayloadAction<{ open: boolean, message: string }>) => {
      state.snackbar.open = action.payload.open;
      state.snackbar.message = action.payload.message;
    },

    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  }
});

export const { setSnackbar, closeSnackbar, setAppLoading, onQueryChange, assignSearchResult, selectCategory, openConfirmModal, closeConfirmModal } = appSlice.actions

export default appSlice.reducer;
