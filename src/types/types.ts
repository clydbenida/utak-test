import { Control, UseFormRegister } from "react-hook-form";

export type ThemeMode = 'dark' | 'light';

export interface AppStoreInitialState {
  themeMode: ThemeMode
}

export interface CreateMenuDialogPropTypes {
  open: boolean;
  handleCancel: () => void;
}

export interface CustomTextBoxPropTypes {
  label?: string;
  placeholder?: string;
  value?: string;
}

export interface CreateMenuFormPropTypes {
  register: UseFormRegister<MenuItem>;
  control: Control<MenuItem>;
}

export interface MenuOptionItemPropTypes {
  item: string;
  values?: string[];
  handleAddOptionItem: (name: string, newValue: string) => void;
}

export interface CreateMenuOptionsPropTypes {
  menuOptions?: MenuOption[];
  handleAddOption: (name: string) => void;
  handleAddOptionItem: (name: string, newValue: string) => void;
}

export interface MenuOption {
  name: string;
  values?: string[];
}

export type MenuOptionErrorValues = "Duplicate" | "Empty" | ""


export interface MenuItem {
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  options: MenuOption[];
}

export interface MenuFormState extends MenuItem {
  error?: string;
}

export interface MenuInitialStateType {
  categories: string[];
  menuItems: MenuItem[];
  menuForm?: MenuFormState;
}



export interface AddOptionFieldPropTypes {
  placeholder?: string;
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
  onClickAdd: () => void;
  error?: string;
  value?: string;
  showAddBtn?: boolean;
}
