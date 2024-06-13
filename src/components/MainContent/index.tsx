import { useCallback, useMemo } from "react";
import { Container } from "@mui/material";

import { useAppSelector } from "../../redux/hooks";
import CategorySection from "./components/CategorySection";
import Filters from "./components/Filters";
import { MainContenPropTypes, MenuItem } from "../../types/types";

const getGroupedCategories = (array?: MenuItem[]) => {
  if (!array) { return [] }
  const menuCategories = new Set(array.map(item => item.category));

  return Array.from(menuCategories).map((category: string) => {
    const filteredMenuItems = array.filter(item => item.category === category);
    return { category, items: filteredMenuItems }
  });
}

export default function MainContent(props: MainContenPropTypes) {
  const menuItems = useAppSelector(state => state.menu.menuItems);
  const { result: searchResult, query } = useAppSelector(state => state.app.search);

  const groupedMenuItems = useMemo(() => getGroupedCategories(menuItems), [menuItems]);
  const groupedSearchResult = useMemo(() => getGroupedCategories(searchResult), [searchResult]);

  const renderCategorySections = useCallback((array: typeof groupedMenuItems) => array.map((category, key) => (
    <CategorySection
      key={key}
      categoryName={category.category}
      items={category.items}
      handleOpenEditMenu={props.handleOpenEditMenu}
    />
  )), [props.handleOpenEditMenu]);

  const renderMenuItems = useMemo(() => (
    renderCategorySections(groupedMenuItems)
  ), [groupedMenuItems, renderCategorySections]);

  const renderSearchItems = useMemo(() => (
    renderCategorySections(groupedSearchResult)
  ), [groupedSearchResult, renderCategorySections]);

  return (
    <Container>
      <Filters />
      {query ? renderSearchItems : renderMenuItems}
    </Container>
  );
}
