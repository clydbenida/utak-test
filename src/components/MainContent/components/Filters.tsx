import { useMemo } from "react";
import { Box, Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCategory } from "../../../redux/app/appReducer";

export default function Filters() {
  const categories = useAppSelector(state => state.menu.categories);
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.app.selectedCategory)

  const renderCategoryFilters = useMemo(() => categories.map((category, key) => (
    <Button
      variant={selectedCategory === category ? "contained" : "outlined"}
      onClick={() => dispatch(selectCategory(category))}
      key={key}
    >
      {category}
    </Button>
  )), [categories, selectedCategory]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: "1rem" }}>
        {renderCategoryFilters}
      </Box>
    </Box>
  );
}
