import emotionStyled from "@emotion/styled"
import { Box, Button, styled } from "@mui/material"


export const StyledH2 = emotionStyled.h2`
  margin: 0;
`

export const CardButton = styled(Button)`
  width: fit-content;
  min-width: unset;
  padding: 5px;
`

export const CardActionContainer = styled(Box)`
  display: flex;
  top: -0.5rem;
  right: -0.5rem;
  position: absolute;
  gap: 4;
`

export const CardDetail = emotionStyled.div`
  font-size: 14px;
`

export const CategorySectionHeader = emotionStyled.h2`
  margin-bottom: 0;
`
