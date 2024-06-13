import { set, ref, update } from "firebase/database";
import { v4 as uuid } from "uuid"
import { db } from "./index";
import { MenuItem } from "../types/types";


export const postMenuItem = (menuItem: MenuItem) => {
  const menu_id = uuid();
  set(ref(db, "menuItems/" + menu_id), { ...menuItem, menu_id: menu_id })
}

export const editMenuItem = (menuItem: MenuItem) => {
  const updates = {
    [`/menuItems/${menuItem.menu_id}`]: menuItem
  };

  return update(ref(db), updates)
}

export const deleteMenuItem = (menu_id: string) => {
  const updates = {
    [`/menuItems/${menu_id}`]: null,
  };

  return update(ref(db), updates)
}
