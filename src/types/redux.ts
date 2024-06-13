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

