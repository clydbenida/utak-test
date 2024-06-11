import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";

export default function Filters() {
  const categories = useAppSelector(state => state.menu.categories);
  const [selectedCategories, setSelectedCategories] = useState("All");

  const renderCategoryFilters = useMemo(() => categories.map((category, key) => (
    <Button
      variant={selectedCategories === category ? "contained" : "outlined"}
      onClick={() => setSelectedCategories(category)}
      key={key}
    >
      {category}
    </Button>
  )), [categories, selectedCategories]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: "1rem" }}>
        {renderCategoryFilters}
      </Box>
    </Box>
  );
}
