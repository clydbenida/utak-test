import { useMemo } from "react";
import { Container } from "@mui/material";

import { useAppSelector } from "../../redux/hooks";
import CategorySection from "./components/CategorySection";
import Filters from "./components/Filters";
import { MainContenPropTypes } from "../../types/types";

export default function MainContent(props: MainContenPropTypes) {
  const menuItems = useAppSelector(state => state.menu.menuItems);

  const groupedMenuItems = useMemo(() => {
    const menuCategories = new Set(menuItems.map(item => item.category));

    return Array.from(menuCategories).map((category: string) => {
      const filteredMenuItems = menuItems.filter(item => item.category === category);
      return { category, items: filteredMenuItems }
    });
  }, [menuItems]);

  const renderCategorySections = useMemo(() => (groupedMenuItems.map((category, key) => (
    <CategorySection
      key={key}
      categoryName={category.category}
      items={category.items}
      handleOpenEditMenu={props.handleOpenEditMenu}
    />
  ))), [groupedMenuItems]);

  return (
    <Container>
      <Filters />
      {renderCategorySections}
    </Container>
  );
}
