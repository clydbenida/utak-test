import { Box, Button, Card, CardContent, Container, Grid, styled } from "@mui/material";
import Filters from "./components/Filters";
import { useAppSelector } from "../../redux/hooks";
import { useMemo } from "react";
import { Delete, Edit } from "@mui/icons-material";
import emotionStyled from "@emotion/styled";

interface MenuItemPropTypes {
  name: string;
  price: number;
  stock: number;
}

const StyledH2 = emotionStyled.h2`
  margin: 0;
`

const CardButton = styled(Button)`
  width: fit-content;
  min-width: unset;
  padding: 5px;
`

const CardActionContainer = styled(Box)`
  display: flex;
  gap: 4;
`

function MenuItemComponent(props: MenuItemPropTypes) {
  return (
    <Card variant="outlined" sx={{ border: "1px solid #6e6e6e5f", }}>
      <CardContent>
        <Box sx={{ display: "flex", top: 0, justifyContent: 'space-between' }}>
          <StyledH2>{props.name}</StyledH2>
          <CardActionContainer>
            <CardButton variant="text"><Edit /> </CardButton>
            <CardButton variant="text"><Delete /></CardButton>
          </CardActionContainer>
        </Box>
        <div>Price: {props.price} </div>
        <div>Stock: {props.stock} remaining</div>
      </CardContent>
    </Card>
  )
}

export default function MainContent() {
  const menuItems = useAppSelector(state => state.menu.menuItems);

  const renderMenuItems = useMemo(() => menuItems.map(
    (item, key) => (
      <Grid key={key} item md={3}>
        <MenuItemComponent name={item.name} stock={item.stock} price={item.price} />
      </Grid>
    )), [menuItems])
  return (
    <Container>
      <Filters />

      <Grid gap={4} container sx={{ marginY: '2rem' }}>
        {renderMenuItems}
      </Grid>
    </Container>
  );
}
