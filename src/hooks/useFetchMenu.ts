import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { Query, endAt, onValue, orderByChild, query, ref, startAt } from "firebase/database";
import { db } from "../firebase";
import { MenuItem } from "../types/types";
import { assignMenuItems } from "../redux/menu/menuReducer";
import { assignSearchResult, setAppLoading } from "../redux/app/appReducer";

export default function useFetchMenu(keyword?: string) {
  const menuRef = ref(db, 'menuItems');
  const dispatch = useAppDispatch();

  const readQueryValue = useCallback((dbQuery: Query, actionDispatch: typeof assignMenuItems | typeof assignSearchResult) => {
    dispatch(setAppLoading(true));
    onValue(dbQuery, (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        dispatch(actionDispatch([]));
        dispatch(setAppLoading(false));
        return;
      }

      const dataKeys = Object.keys(data);
      const menuItems: MenuItem[] = dataKeys.map(uidKey => data[uidKey]);
      dispatch(actionDispatch(menuItems));
      dispatch(setAppLoading(false));
    })
  }, [dispatch])

  useEffect(() => {
    if (!keyword) return;
    dispatch(setAppLoading(true));

    const searchRef = query(menuRef, orderByChild("name"), startAt(keyword), endAt(`${keyword}\uf8ff`));

    keyword && readQueryValue(searchRef, assignSearchResult)
  }, [menuRef, keyword, dispatch, readQueryValue]);

  useEffect(() => {
    readQueryValue(menuRef, assignMenuItems)
  }, [menuRef, dispatch])
}
