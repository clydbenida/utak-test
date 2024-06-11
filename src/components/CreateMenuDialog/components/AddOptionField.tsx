import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import emotionStyled from "@emotion/styled";

import { StyledInput } from "./styled";
import { useAppSelector } from "../../../redux/hooks";
import { AddOptionFieldPropTypes } from "../../../types/types";

const ErrorSpan = emotionStyled.span`
  color: #FF6070;
`

export default function AddOptionField(props: AddOptionFieldPropTypes) {
  const menuForm = useAppSelector(state => state.menu.menuForm);
  const error = menuForm?.error?.options;

  const optionError = (): string => {
    if (menuForm?.optionError && props?.optionName) {
      return menuForm?.optionError[props?.optionName];
    }
    return ''
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <StyledInput
          type="text"
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChangeText}
          onKeyDown={(e) => e.key === "Enter" && props.onClickAdd()}
        />
        {props.showAddBtn && (
          <Button variant="outlined" sx={{ marginLeft: "0.8rem", padding: 0 }} onClick={props.onClickAdd}>
            <Add />
          </Button>
        )}
      </Box>
      {(error === "Duplicate" || optionError() === "Duplicate") && (
        <ErrorSpan>Item must be unique</ErrorSpan>
      )}
    </>
  )
}
