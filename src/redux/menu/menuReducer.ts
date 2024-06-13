import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuItem, MenuValue } from "../../types/types";
import { MENU } from "../constants";
import { MenuInitialStateType } from "../../types/redux";

const initialState: MenuInitialStateType = {
  categories: ["All", "Meals", "Sides", "Drinks", "Desserts"],
  menuItems: [],
  loading: false,
  menuForm: {
    fields: {
      name: "",
      cost: 0,
      price: 0,
      stock: 0,
      category: ''
    },
    isEdit: false,
    error: {},
    optionError: {},
  },
}

interface ChangeFormParams {
  name: keyof MenuItem;
  newValue: string;
}

interface AddOptionItemParams {
  optionName: string;
  newValue: MenuValue;
}

export const menuSlice = createSlice({
  name: MENU,
  initialState,
  reducers: {
    assignMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.menuItems = action.payload;
    },

    assignMenuForm: (state, action: PayloadAction<MenuItem>) => {
      state.menuForm.fields = { ...action.payload };
      state.menuForm.isEdit = true;
    },

    validateMenuFormFields: (state) => {
      // Validate Menu Items
      // Get plain fields
      state.loading = true;
      state.menuForm.error = initialState.menuForm.error;
      state.menuForm.optionError = initialState.menuForm.optionError;

      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { options, ...plainFields } = { ...state.menuForm.fields };
      for (const key in plainFields) {
        if (!plainFields[key as keyof typeof plainFields]) {
          console.log(plainFields);
          state.menuForm.error = {
            ...state.menuForm.error, [key]: "Empty"
          }
        }
      }

      // Validate options
      // Check if each options has a value
      const optionsLength = state.menuForm.fields?.options?.length ?? 0;

      if (state.menuForm.fields?.options) {
        for (let i = 0; i < optionsLength; i++) {
          const currentOption = state.menuForm?.fields?.options[i];
          if (!currentOption.values?.length) {
            state.menuForm.optionError = { [currentOption.name]: "Empty" }
          }
        }
      }

      const plainFieldError = Object.keys({ ...state.menuForm.error });
      const optionsError = Object.keys({ ...state.menuForm.optionError });

      if (!plainFieldError.length && !optionsError.length && state.menuForm.fields) {
        // const { fields } = state.menuForm
      }
    },

    resetMenuForm: (state) => {
      state.menuForm = initialState.menuForm;
    },

    changeFormField: (state, action: PayloadAction<ChangeFormParams>) => {
      const fieldName = action.payload.name;
      state.menuForm.fields = {
        ...state.menuForm.fields,
        [fieldName]: action.payload.newValue,
      };
    },

    addOption: (state, action: PayloadAction<string>) => {
      if (!state.menuForm.fields) {
        return;
      }

      const newOption = action.payload;
      const dupOption = state.menuForm.fields.options
        ? state.menuForm.fields.options.filter(opt => opt.name === newOption)
        : []

      if (!newOption) {
        return;
      }

      if (dupOption.length) {
        state.menuForm.error = { options: "Duplicate" }
      } else {
        if (state.menuForm.fields.options?.length) {
          state.menuForm.fields.options = [
            ...state.menuForm.fields.options,
            { name: newOption, values: [] }
          ]
        } else {
          state.menuForm.fields.options = [{ name: newOption, values: [] }]
        }
      }
    },

    removeOption: (state, action: PayloadAction<string>) => {
      if (!state.menuForm.fields) return;
      if (!state.menuForm.fields.options) return;

      const filteredOptions = state.menuForm.fields.options.filter(item => item.name !== action.payload);
      state.menuForm.fields.options = filteredOptions;
    },


    addOptionItem: (state, action: PayloadAction<AddOptionItemParams>) => {
      if (!state.menuForm.fields) return;
      if (!state.menuForm.fields.options) return;

      const { optionName, newValue } = action.payload

      if (!newValue) {
        return;
      }

      const newOptions = state.menuForm.fields.options.map((opt) => {
        if (opt.name !== optionName) {
          return opt;
        }

        const dupOptionItem = opt.values?.filter(item => item.name === newValue.name);

        if (dupOptionItem?.length) {
          state.menuForm.optionError = { [opt.name]: "Duplicate" }
          return opt;
        } else {
          if (opt.values?.length) {
            return { ...opt, values: [...opt.values, newValue] }
          }
          return { ...opt, values: [newValue] }
        }

      });

      state.menuForm.fields.options = newOptions;
    },

    removeOptionItem: (state, action: PayloadAction<{ targetName: string, targetValue: MenuValue }>) => {
      if (!state.menuForm.fields) return;
      if (!state.menuForm.fields.options) return;

      const { targetName, targetValue } = action.payload;
      const filteredOptions = state.menuForm.fields.options.map(item => {
        if (item.name !== targetName) {
          return item;
        }

        const filteredValues = item.values?.filter(val => val.name !== targetValue.name);
        return { ...item, values: filteredValues }
      });

      state.menuForm.fields.options = filteredOptions;
    },

    setMenuLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
})

export const {
  assignMenuItems,
  assignMenuForm,
  resetMenuForm,
  removeOption,
  removeOptionItem,
  validateMenuFormFields,
  changeFormField,
  addOption,
  addOptionItem,
  setMenuLoading
} = menuSlice.actions

export default menuSlice.reducer
