import { Box, Grid } from "@mui/material";

import { CategorySectionHeader } from "./styled";
import MenuItemCard from "./MenuItemCard";
import { MenuItem } from "../../../types/types";
import { useAppSelector } from "../../../redux/hooks";

interface CategorySectionPropTypes {
  categoryName: string;
  items: MenuItem[];
  handleOpenEditMenu: () => void;
}

export default function CategorySection(props: CategorySectionPropTypes) {
  const selectedCategory = useAppSelector(state => state.app.selectedCategory);
  const shouldShowCategory = selectedCategory === props.categoryName || (selectedCategory === "All")

  return (
    <Box sx={{ display: shouldShowCategory ? "block" : "none" }}>
      <CategorySectionHeader>
        {props.categoryName}
      </CategorySectionHeader>
      <Grid gap={4} container sx={{ marginBottom: '2rem', marginTop: "1rem" }}>
        {props.items.map((item, key) => (
          <Grid key={key} item md={3}>
            <MenuItemCard data={item} handleOpenEditMenu={props.handleOpenEditMenu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
