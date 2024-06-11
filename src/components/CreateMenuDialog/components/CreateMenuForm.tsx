import { useMemo } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import { CreateMenuFormPropTypes } from "../../../types/types";
import CreateMenuTextfield from "./CreateMenuTextfield";
import { useAppSelector } from "../../../redux/hooks";
import { StyledLabel } from "./styled";
import { Controller } from "react-hook-form";

export default function CreateMenuForm(props: CreateMenuFormPropTypes) {
  const categories = useAppSelector(state => state.menu.categories);
  const { register } = props;

  const renderCategories = useMemo(() => categories.map((category, key) => (
    <MenuItem key={key} value={category}>{category}</MenuItem>
  )), [categories])

  return (
    <div>
      <h3>Basic Information</h3>
      <CreateMenuTextfield
        register={register}
        name="name"
        placeholder="Name"
        label="Name"
      />
      <Controller
        control={props.control}
        name="category"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Box>
            <StyledLabel>Category</StyledLabel>
            <Select
              defaultValue="All"
              fullWidth
              sx={{
                border: "1px solid #6e6e6e5f",
                width: '100%',
              }}
              onChange={onChange}
              onBlur={onBlur}
              value={value ?? "All"}
              ref={ref}
            >
              {renderCategories}
            </Select>
          </Box>
        )} />
      <h3>Product Information</h3>
      <CreateMenuTextfield
        register={register}
        name="price"
        placeholder="Price"
        label="Price"
      />
      <CreateMenuTextfield
        register={register}
        name="cost"
        placeholder="Cost"
        label="Cost"
      />
      <h3>Inventory Information</h3>
      <CreateMenuTextfield
        register={register}
        name="stock"
        placeholder="Stock"
        label="Stock"
      />
    </div>
  );
}
