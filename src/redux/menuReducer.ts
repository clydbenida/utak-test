import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuInitialStateType, MenuItem } from "../types/types";

const initialState: MenuInitialStateType = {
  categories: ["All", "Meals", "Sides", "Drinks", "Desserts"],
  menuItems: []
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItems: (state, action: PayloadAction<MenuItem>) => {
      state.menuItems.push(action.payload);
    }
  }
})

export const { addMenuItems } = menuSlice.actions

export default menuSlice.reducer
