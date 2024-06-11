import { Box } from "@mui/material";
import { useMemo, useState } from "react";

import MenuOptionItem from "./MenuOptionItem";
import AddOptionField from "./AddOptionField";
import { CreateMenuOptionsPropTypes } from "../../../types/types";
import { StyledLabel } from "./styled";

export default function CreateMenuOptions(props: CreateMenuOptionsPropTypes) {
  const { menuOptions } = props
  const [newOption, setNewOption] = useState("");

  const renderMenuOptions = useMemo(
    () => menuOptions?.map((item, key) => (
      <MenuOptionItem
        key={key}
        item={item.name}
        values={item.values}
        handleAddOptionItem={props.handleAddOptionItem}
      />
    )), [menuOptions, props.handleAddOptionItem]);

  const handleAddClick = () => {
    props.handleAddOption(newOption);
    setNewOption("")
  }

  return (
    <Box>
      <h3>Add Options</h3>
      <StyledLabel>&nbsp;</StyledLabel>
      <AddOptionField
        showAddBtn
        placeholder="Add an option (e.g. Size, Flavors, Add-ons)"
        onChangeText={(e) => setNewOption(e.target.value)}
        onClickAdd={handleAddClick}
        value={newOption}
      />
      {menuOptions?.length && renderMenuOptions}
    </Box>
  )
}
