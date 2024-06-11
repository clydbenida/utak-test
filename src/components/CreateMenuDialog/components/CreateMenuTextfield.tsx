import { Box } from "@mui/material";
import { StyledInput, StyledLabel } from "./styled";
import { UseFormRegister } from "react-hook-form";
import { MenuItem } from "../../../types/types";

interface CreateMenuTextfieldPropTypes {
  register: UseFormRegister<MenuItem>;
  label?: string;
  placeholder?: string;
  name: keyof MenuItem;
}

export default function CreateMenuTextfield(props: CreateMenuTextfieldPropTypes) {
  return (
    <Box sx={{
      marginBottom: '1rem',
    }}>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInput type="text"  {...props.register(props.name)} />
    </Box>
  )
}
