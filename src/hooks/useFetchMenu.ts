import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { Query, endAt, onValue, orderByChild, query, ref, startAt } from "firebase/database";
import { db } from "../firebase";
import { MenuItem } from "../types/types";
import { assignMenuItems } from "../redux/menu/menuReducer";
import { assignSearchResult } from "../redux/app/appReducer";

export default function useFetchMenu(keyword?: string) {
  const menuRef = ref(db, 'menuItems');
  const dispatch = useAppDispatch();

  const readQueryValue = useCallback((dbQuery: Query, actionDispatch: typeof assignMenuItems | typeof assignSearchResult) => {
    onValue(dbQuery, (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        dispatch(actionDispatch([]));
        return;
      }

      const dataKeys = Object.keys(data);
      const menuItems: MenuItem[] = dataKeys.map(uidKey => data[uidKey]);
      dispatch(actionDispatch(menuItems));
    })
  }, [dispatch])

  useEffect(() => {
    if (!keyword) return;

    const searchRef = query(menuRef, orderByChild("name"), startAt(keyword), endAt(`${keyword}\uf8ff`));

    keyword && readQueryValue(searchRef, assignSearchResult)
  }, [menuRef, keyword, dispatch, readQueryValue]);

  useEffect(() => {
    readQueryValue(menuRef, assignMenuItems)
  }, [menuRef, dispatch])
}
