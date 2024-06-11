import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuInitialStateType, MenuItem } from "../types/types";

const initialState: MenuInitialStateType = {
  categories: ["All", "Meals", "Sides", "Drinks", "Desserts"],
  menuItems: [],
  loading: false,
  menuForm: {
    name: "",
    options: [],
    cost: 0,
    price: 0,
    stock: 0,
    error: {

    },
    category: ''
  },
}

interface ChangeFormParams {
  name: keyof MenuItem;
  newValue: string;
}

interface AddOptionItemParams {
  optionName: string;
  newValue: string;
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItems: (state) => {
      // Validate Menu Items
      // Get plain fields
      state.loading = true;
      state.menuForm.error = initialState.menuForm.error;
      state.menuForm.optionError = initialState.menuForm.optionError;

      const { optionError, error, options, ...plainFields } = state.menuForm;
      for (const key in plainFields) {
        if (!plainFields[key as keyof typeof plainFields]) {
          state.menuForm.error = {
            ...state.menuForm.error, [key]: "Empty"
          }
        }
      }

      // Validate options
      // Check if each options has a value
      const optionsLength = state.menuForm.options.length;

      for (let i = 0; i < optionsLength; i++) {
        const currentOption = state.menuForm.options[i];
        if (!currentOption.values?.length) {
          state.menuForm.optionError = { [currentOption.name]: "Empty" }
        }
      }

      const plainFieldError = Object.keys({ ...state.menuForm.error });
      const optionsError = Object.keys({ ...state.menuForm.optionError });

      console.log("error values", state.menuForm.error, state.menuForm.optionError)
      console.log("if statement", !plainFieldError.length && !optionsError.length);
      console.log("if statement value", plainFieldError.length, optionsError.length);

      if (!plainFieldError.length && !optionsError.length) {
        const { optionError, error, ...fields } = state.menuForm
        state.menuItems.push(fields);
        state.loading = false;
        console.log("loading set to false, menu is pushed");
      }
    },

    changeFormField: (state, action: PayloadAction<ChangeFormParams>) => {
      const fieldName = action.payload.name;
      state.menuForm = {
        ...state.menuForm,
        [fieldName]: action.payload.newValue,
      };
    },

    addOption: (state, action: PayloadAction<string>) => {
      const newOption = action.payload;
      const dupOption = state.menuForm.options.filter(opt => opt.name === newOption)

      if (dupOption.length) {
        state.menuForm.error = { options: "Duplicate" }
      } else {
        state.menuForm.options = [
          ...state.menuForm.options,
          { name: newOption, values: [] }
        ]
      }
    },

    removeOption: (state, action: PayloadAction<string>) => {
    },

    addOptionItem: (state, action: PayloadAction<AddOptionItemParams>) => {
      const { optionName, newValue } = action.payload

      const newOptions = state.menuForm.options.map((opt) => {
        if (opt.name !== optionName) {
          return opt;
        }

        const dupOptionItem = opt.values?.filter(item => item === newValue);

        if (dupOptionItem?.length) {
          console.log("Has duplicate");
          state.menuForm.optionError = { [opt.name]: "Duplicate" }
          return opt;
        } else {
          console.log("No duplicate");
          console.log(opt.values?.length)
          if (opt.values?.length) {
            console.log("has values");
            return { ...opt, values: [...opt.values, newValue] }
          }
          return { ...opt, values: [newValue] }
        }

      });

      state.menuForm.options = newOptions;
    },

    setMenuLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
})

export const { addMenuItems, changeFormField, addOption, addOptionItem, setMenuLoading } = menuSlice.actions

export default menuSlice.reducer
