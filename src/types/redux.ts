import { MenuFormState, MenuItem } from "./types";

export interface AppStoreInitialState {
  selectedCategory: string;
  confirmModal: {
    open?: boolean;
    message?: string;
  },
  search: {
    query?: string;
    result?: MenuItem[];
  },
  loading: boolean;
  snackbar: {
    open: boolean;
    message: string;
  }
}

export interface MenuInitialStateType {
  categories: string[];
  menuItems: MenuItem[];
  menuForm: MenuFormState;
  loading: boolean;
}

export interface DeleteItemSagaParams {
  menu_id: string;
}

