import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { CloseRounded, Delete } from "@mui/icons-material";
import emotionStyled from "@emotion/styled";

import { MenuOptionItemPropTypes } from "../../../types/types";
import AddOptionField from "./AddOptionField";
import { useAppDispatch } from "../../../redux/hooks";
import { removeOption, removeOptionItem } from "../../../redux/menu/menuReducer";

const StyledH5 = emotionStyled.h5`
  margin: 0;
`

const ValueBadge = emotionStyled.span`
  border: 1px solid #6e6e6e5f;
  color: #000;
  padding: 4px 9px;
  padding-right: 2px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  gap: 1rem;
`

const ValueContainer = emotionStyled.div`
  color: #FFF;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

export default function MenuOptionItem({ item, values, handleAddOptionItem }: MenuOptionItemPropTypes) {
  const [newValue, setNewValue] = useState("");
  const dispatch = useAppDispatch();
  const renderValues = useMemo(() => (values && values.map((value, key) => (
    <ValueBadge key={key}>
      {value}

      <Button sx={{ minWidth: 'unset' }} size="small" onClick={() => dispatch(removeOptionItem({ targetName: item, targetValue: value }))}>
        <CloseRounded sx={{ marginRight: '3px' }} color="secondary" />
      </Button>
    </ValueBadge>
  ))), [values]);

  const handleClickAdd = () => {
    handleAddOptionItem(item, newValue)
    setNewValue("")
  }

  return (
    <Box sx={{
      marginY: "1rem",
    }}>

      <Box sx={{ marginY: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StyledH5>{item}</StyledH5>
        <Button sx={{ minWidth: 'unset' }} size="small" onClick={() => dispatch(removeOption(item))}><Delete /></Button>
      </Box>
      <AddOptionField
        optionName={item}
        value={newValue}
        placeholder={`Type an option for "${item}" then press Enter.`}
        onChangeText={(e) => setNewValue(e.target.value)}
        onClickAdd={handleClickAdd}
      />

      {/*
      <Autocomplete multiple options={[]} freeSolo renderInput={(params) => (
        <TextField {...params} type="text" placeholder="Add an option" sx={{ width: '25rem', border: "1px solid #6e6e6e5f", borderRadius: '4px' }} />
      )} />
      */}

      <ValueContainer>
        {renderValues}
      </ValueContainer>
    </Box>
  );
}
