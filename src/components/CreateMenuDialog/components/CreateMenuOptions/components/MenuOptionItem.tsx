import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import emotionStyled from "@emotion/styled";

import { MenuOptionItemPropTypes } from "../../../../../types/types";
import AddOptionField from "./AddOptionField";
import { useAppDispatch } from "../../../../../redux/hooks";
import { removeOption } from "../../../../../redux/menu/menuReducer";
import { StyledInput } from "../../styled";
import MenuOptionTable from "./MenuOptionTable";

export default function MenuOptionItem({ item, values, handleAddOptionItem }: MenuOptionItemPropTypes) {
  const [newValue, setNewValue] = useState("");
  const [addedCost, setAddedCost] = useState("");
  const [addedPrice, setAddedPrice] = useState("");
  const dispatch = useAppDispatch();

  const handleClickAdd = () => {
    if (newValue && addedCost && addedPrice) {
      handleAddOptionItem(item, {
        name: newValue,
        addedCost: Number(addedCost),
        addedPrice: Number(addedPrice)
      });
      setNewValue("")
      setAddedCost("")
      setAddedPrice("")
    }
  }

  return (
    <Box sx={{
      marginY: "1rem",
      border: "1px solid #6e6e6e5f",
      borderRadius: "5px",
      padding: "1rem",
    }}>
      <Box sx={{ marginY: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StyledH5>{item}</StyledH5>
        <Button sx={{ minWidth: 'unset' }} size="small" onClick={() => dispatch(removeOption(item))}><Delete /></Button>
      </Box>
      <Stack>
        <AddOptionField
          optionName={item}
          value={newValue}
          placeholder={`Type an option for "${item}"`}
          onChangeText={(e) => setNewValue(e.target.value)}
          onClickAdd={handleClickAdd}
        />
        <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
          <StyledInput
            placeholder="Addtl. price"
            type="number"
            value={addedPrice}
            onChange={e => setAddedPrice(e.target.value)}
          />
          <StyledInput placeholder="Addtl. cost" type="number" value={addedCost} onChange={e => setAddedCost(e.target.value)} />
        </Stack>
        <Button onClick={handleClickAdd} variant="contained" sx={{ width: '100%', marginY: '1rem' }}>Add option</Button>
        <ValueContainer>
          <MenuOptionTable values={values} optionName={item} />
          {!values?.length ? (
            <Stack sx={{ width: '100%', textAlign: 'center' }}>
              Options will be added here
            </Stack>
          ) : ""}
        </ValueContainer>
      </Stack>
    </Box>
  );
}

const StyledH5 = emotionStyled.h4`
  margin: 0;
`

const ValueContainer = emotionStyled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: col;
  gap: 1rem;
  flex-wrap: wrap;
`
