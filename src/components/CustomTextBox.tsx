import { Box } from "@mui/material";
import { CustomTextBoxPropTypes } from "../types/types";
import emotionStyled from "@emotion/styled";

const StyledLabel = emotionStyled.label`
  font-size: 12px;
`

const StyledInput = emotionStyled.input`
  padding: 0.8em 0.8em;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid;
  width: auto;
  display: block;
`

export default function CustomTextBox(props: CustomTextBoxPropTypes) {
  return (
    <Box>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInput type="text" placeholder={props.placeholder} />
    </Box>
  )
}
