import { PropsWithChildren } from "react";

export interface CreateMenuDialogPropTypes extends PropsWithChildren {
  open: boolean;
  handleCancel?: () => void;
  handleClose: () => void;
}

export interface MenuDialogContentProps {
  handleCancel?: () => void;
  handleClose: () => void;
}

export interface MenuOptionItemPropTypes {
  item: string;
  values?: MenuValue[];
  handleAddOptionItem: (name: string, newValue: MenuValue) => void;
}

export interface CreateMenuOptionsPropTypes {
  menuOptions?: MenuOption[];
  handleAddOption: (name: string) => void;
  handleAddOptionItem: (name: string, newValue: MenuValue) => void;
}

export interface MenuValue {
  name: string;
  addedPrice: number;
  addedCost: number;
}

export interface MenuOption {
  name: string;
  values?: MenuValue[];
}

export type MenuOptionErrorValues = "Duplicate" | "Empty" | ""

export interface MenuItem {
  menu_id?: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  options?: MenuOption[];
}

export interface MenuFormState {
  error?: Record<string, MenuOptionErrorValues>;
  optionError?: Record<string, MenuOptionErrorValues>;
  fields: MenuItem;
  isEdit: boolean;
}

export interface AddOptionFieldPropTypes {
  placeholder?: string;
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
  onClickAdd: () => void;
  error?: string;
  value?: string;
  showAddBtn?: boolean;
  optionName?: string;
}

export interface MenuItemPropTypes {
  data: MenuItem;
  handleOpenEditMenu: () => void;
}

export interface MainContenPropTypes {
  handleOpenEditMenu: () => void;
}
