import { MenuFormState, MenuItem, ThemeMode } from "./types";

export interface AppStoreInitialState {
  themeMode: ThemeMode;
  selectedCategory: string;
  confirmModal: {
    open?: boolean;
    message?: string;
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

