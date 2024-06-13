import { Box, Card, CardContent, styled } from "@mui/material";

import { useAppDispatch } from "../../../redux/hooks";
import { assignMenuForm } from "../../../redux/menu/menuReducer";
import { MenuItemPropTypes } from "../../../types/types";
import emotionStyled from "@emotion/styled";

export default function MenuItemCard(props: MenuItemPropTypes) {
  const dispatch = useAppDispatch();
  const { name, price, stock } = props.data

  const handleClickEdit = () => {
    props.handleOpenEditMenu();
    dispatch(assignMenuForm(props.data))
  }

  return (
    <Card
      variant="outlined"
      sx={cardStyle}
      onClick={handleClickEdit}
    >
      <CardContent>
        <Box sx={{ display: "flex", top: 0, justifyContent: 'space-between', position: 'relative' }}>
          <StyledH2>{name}</StyledH2>
          <CardActionContainer>
          </CardActionContainer>
        </Box>
        <CardDetail>Price: ₱{price} </CardDetail>
        <CardDetail>Stock: {stock} remaining</CardDetail>
      </CardContent>
    </Card>
  )
}

const cardStyle = {
  border: "1px solid #6e6e6e5f",
  borderRadius: "14px",
  backgroundColor: "white",
  cursor: "pointer",
  transition: "all 150ms ease-in",
  "&:hover": {
    backgroundColor: "rgba(255, 99, 71, 0.08)",
    border: "1px solid #FF6347"
  }
}

const StyledH2 = emotionStyled.h2`
  margin: 0;
`

const CardActionContainer = styled(Box)`
  display: flex;
  top: -0.5rem;
  right: -0.5rem;
  position: absolute;
  gap: 4;
`

const CardDetail = emotionStyled.div`
  font-size: 14px;
`

