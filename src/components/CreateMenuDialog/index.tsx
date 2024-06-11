import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import CreateMenuForm from "./components/CreateMenuForm";
import CreateMenuOptions from "./components/CreateMenuOptions";
import { CreateMenuDialogPropTypes, MenuItem, MenuOption } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addMenuItems } from "../../redux/menuReducer";

export default function CreateMenuDialog({ open, ...props }: CreateMenuDialogPropTypes) {
  const dispatch = useAppDispatch();
  const menuFormState = useAppSelector(state => state.menu.menuForm);
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>();

  const { control, register, handleSubmit, getValues, setValue } = useForm({ defaultValues: menuFormState })
  const optionFormValue = getValues("options");

  const handleClickSave = (data: MenuItem) => {
    console.log(data)
    // TODO: Add validation
    dispatch(addMenuItems(data));
  }

  const handleAddOption = (newOption: string) => {
    if (!menuOptions) {
      setMenuOptions(() => [{ name: newOption, values: [] }]);
      return;
    }

    // Check if input is unique
    const duplicateItem = menuOptions.filter((item) => item.name === newOption);

    if (duplicateItem.length) {
      return;
    }

    if (optionFormValue?.length) {
      const optionFormValueCopy = [...optionFormValue]
      optionFormValue.push({ name: newOption, values: [] })
      setValue("options", optionFormValueCopy);
    } else {
      setValue("options", [{ name: newOption, values: [] }]);
    }

    setMenuOptions(prev => [...prev!, { name: newOption, values: [] }]);
  }

  const handleAddOptionItem = (optionName: string, newValue: string) => {
    if (!menuOptions) {
      return;
    }

    const newMenuOptions = menuOptions.map((menu) => {
      if (menu.name !== optionName) {
        return menu;
      }

      if (menu.values) {
        return {
          ...menu,
          values: [...menu.values, newValue]
        }
      }

      return {
        ...menu,
        values: [newValue]
      }

    });

    setValue("options", newMenuOptions);
    setMenuOptions(newMenuOptions);
  }

  return (
    <Dialog open={open} onClose={props.handleCancel} fullWidth maxWidth='lg' >
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Create New Menu Item
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="space-around">
          <Grid item md={6} sm={12}>
            <CreateMenuForm control={control} register={register} />
          </Grid>

          <Grid item md={5} sm={12}>
            {/* Options */}
            <CreateMenuOptions
              menuOptions={menuOptions}
              handleAddOption={handleAddOption}
              handleAddOptionItem={handleAddOptionItem}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingRight: "1.5rem", paddingBottom: '1.5rem' }}>
        <Button variant="contained" color="success" onClick={handleSubmit(handleClickSave)}>Save</Button>
        <Button variant="outlined" color="success" onClick={props.handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
