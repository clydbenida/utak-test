import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import { StyledInput } from "./styled";
import { useAppSelector } from "../../../redux/hooks";
import { AddOptionFieldPropTypes } from "../../../types/types";

export default function AddOptionField(props: AddOptionFieldPropTypes) {
  const menuForm = useAppSelector(state => state.menu.menuForm);
  return (
    <Box sx={{ display: 'flex' }}>
      <StyledInput
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChangeText}
        onKeyDown={(e) => e.key === "Enter" && props.onClickAdd()}
      />
      {menuForm?.error === "Duplicate" && (
        <span>Item must be unique</span>
      )}
      {props.showAddBtn && (
        <Button variant="outlined" sx={{ marginLeft: "0.8rem", padding: 0 }} onClick={props.onClickAdd}>
          <Add />
        </Button>
      )}
    </Box>
  )
}
