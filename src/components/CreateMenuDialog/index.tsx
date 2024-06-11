import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";

import CreateMenuForm from "./components/CreateMenuForm";
import CreateMenuOptions from "./components/CreateMenuOptions";
import { CreateMenuDialogPropTypes } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addMenuItems, addOption, addOptionItem, setMenuLoading } from "../../redux/menuReducer";
import { useEffect } from "react";

export default function CreateMenuDialog({ open, ...props }: CreateMenuDialogPropTypes) {
  const dispatch = useAppDispatch();
  const { menuForm: menuFormState, loading: menuLoading, menuItems } = useAppSelector(state => state.menu);

  useEffect(() => {
    if (!menuLoading) {
      console.log("Modal is closing because, menuLoading ===", menuLoading)
      props.handleClose();
    }
  }, [menuLoading]);

  useEffect(() => {
    dispatch(setMenuLoading(false))
  }, [menuItems.length]);

  const handleClickSave = () => {
    // TODO: Add validation
    dispatch(addMenuItems());
  }

  const handleAddOption = (newOption: string) => {
    dispatch(addOption(newOption));
  }

  const handleAddOptionItem = (optionName: string, newValue: string) => {
    dispatch(addOptionItem({ optionName, newValue }));
  }

  return (
    <Dialog open={open} onClose={props.handleCancel} fullWidth maxWidth='lg' >
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Create New Menu Item
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="space-around">
          <Grid item md={6} sm={12}>
            <CreateMenuForm />
          </Grid>

          <Grid item md={5} sm={12}>
            {/* Options */}
            <CreateMenuOptions
              menuOptions={menuFormState.options}
              handleAddOption={handleAddOption}
              handleAddOptionItem={handleAddOptionItem}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingRight: "1.5rem", paddingBottom: '1.5rem' }}>
        <Button variant="contained" color="success" onClick={handleClickSave}>Save</Button>
        <Button variant="outlined" color="success" onClick={props.handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
