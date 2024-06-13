import { useMemo } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import CreateMenuTextfield from "./components/CreateMenuTextfield";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { StyledLabel } from "../styled";
import { changeFormField } from "../../../../redux/menu/menuReducer";

export default function CreateMenuForm() {
  const categories = useAppSelector(state => state.menu.categories);
  const { category } = useAppSelector(state => state.menu.menuForm.fields);
  const dispatch = useAppDispatch();

  const renderCategories = useMemo(() => categories.map((category, key) => (
    <MenuItem key={key} value={category}>{category}</MenuItem>
  )), [categories])

  return (
    <div>
      <h3>Basic Information</h3>
      <CreateMenuTextfield
        name="name"
        placeholder="Name"
        label="Name"
      />
      <Box>
        <StyledLabel>Category</StyledLabel>
        <Select
          defaultValue="All"
          fullWidth
          sx={{
            border: "1px solid #6e6e6e5f",
            width: '100%',
          }}
          onChange={(e) => dispatch(changeFormField({ name: 'category', newValue: e.target.value }))}
          value={category ?? "All"}
        >
          {renderCategories}
        </Select>
      </Box>
      <h3>Product Information</h3>
      <CreateMenuTextfield
        name="price"
        placeholder="Price"
        label="Price"
        type="number"
      />
      <CreateMenuTextfield
        name="cost"
        placeholder="Cost"
        label="Cost"
        type="number"
      />
      <h3>Inventory Information</h3>
      <CreateMenuTextfield
        name="stock"
        placeholder="Stock"
        label="Stock"
        type="number"
      />
    </div>
  );
}
