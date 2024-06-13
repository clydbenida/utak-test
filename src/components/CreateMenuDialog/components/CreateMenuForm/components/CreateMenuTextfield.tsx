import { Box } from "@mui/material";
import { StyledInput, StyledLabel } from "../../styled";
import { MenuItem } from "../../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { changeFormField } from "../../../../../redux/menu/menuReducer";

interface CreateMenuTextfieldPropTypes {
  label?: string;
  placeholder?: string;
  name: keyof MenuItem;
  type?: "text" | "number"
}

export default function CreateMenuTextfield(props: CreateMenuTextfieldPropTypes) {
  const field = useAppSelector(state => state.menu.menuForm.fields[props.name])
  const dispatch = useAppDispatch();
  return (
    <Box sx={{
      marginBottom: '1rem',
    }}>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInput type={props.type} value={field ? `${field}` : ""} onChange={(e) => dispatch(changeFormField({ name: props.name, newValue: e.target.value }))} />
    </Box>
  )
}
