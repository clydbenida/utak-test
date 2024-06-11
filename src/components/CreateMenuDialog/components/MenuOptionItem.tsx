import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import emotionStyled from "@emotion/styled";

import { MenuOptionItemPropTypes } from "../../../types/types";
import AddOptionField from "./AddOptionField";

const StyledH5 = emotionStyled.h5`
  margin-bottom: 0;
`

const ValueBadge = emotionStyled.span`
  border: 1px solid #6e6e6e5f;
  color: #000;
  padding: 4px 9px;
  padding-right: 2px;
  display: flex;
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
  const renderValues = useMemo(() => (values && values.map((value, key) => (
    <ValueBadge key={key}>
      {value}
      <CloseRounded sx={{ marginRight: '3px' }} color="secondary" />
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
      <StyledH5>{item}</StyledH5>
      <AddOptionField
        value={newValue}
        placeholder={`Type an option for "${item}" then press Enter`}
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
