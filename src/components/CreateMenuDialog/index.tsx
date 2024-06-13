import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";

import CreateMenuForm from "./components/CreateMenuForm";
import CreateMenuOptions from "./components/CreateMenuOptions";
import { CreateMenuDialogPropTypes, MenuValue } from "../../types/types";
import ConfirmationModal from "../ConfirmationModal";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addOption, addOptionItem, resetMenuForm, setMenuLoading } from "../../redux/menu/menuReducer";
import { ATTEMPT_ADD_MENU_ITEMS, ATTEMPT_DELETE_MENU_ITEMS, ATTEMPT_EDIT_MENU_ITEMS } from "../../redux/constants";

export default function CreateMenuDialog({ open, ...props }: CreateMenuDialogPropTypes) {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [openConfirmEditModal, setOpenConfirmEditModal] = useState(false);
  const [openConfirmCancelModal, setOpenConfirmCancelModal] = useState(false);
  const [rerenders, setRerenders] = useState(0);

  const detectedFormChange = useMemo(() => rerenders > 1, [rerenders]);

  const dispatch = useAppDispatch();
  const {
    menuForm: {
      fields: menuFormState,
      isEdit
    },
    loading: menuLoading,
    menuItems,
  } = useAppSelector(state => state.menu);

  useEffect(() => {
    if (!menuLoading) {
      props.handleClose();
    }
  }, [menuLoading]);

  useEffect(() => {
    dispatch(setMenuLoading(false))
  }, [menuItems.length]);

  useEffect(() => {
    if (open) {
      console.log("menu form changed", rerenders)

      setRerenders(prev => prev + 1);
    } else {
      setRerenders(0);
    }
  }, [menuFormState, open]);


  const handleAddOption = (newOption: string) => {
    dispatch(addOption(newOption));
  }

  const handleAddOptionItem = (optionName: string, newValue: MenuValue) => {
    dispatch(addOptionItem({ optionName, newValue }));
  }


  const handleConfirmDelete = () => {
    setOpenConfirmDeleteModal(false);
    dispatch({ type: ATTEMPT_DELETE_MENU_ITEMS, payload: { menu_id: menuFormState.menu_id } })

    setTimeout(() => {
      dispatch(resetMenuForm())
    }, 150); // Reset form after closing the animation is done

    props.handleClose();
  }

  const handleConfirmCancel = () => {
    props.handleClose();
    setTimeout(() => {
      dispatch(resetMenuForm())
    }, 150); // Reset form after closing the animation is done

    setOpenConfirmCancelModal(false);
  }

  const handleConfirmEdit = () => {
    if (isEdit) {
      dispatch({ type: ATTEMPT_EDIT_MENU_ITEMS })
    } else {
      dispatch({ type: ATTEMPT_ADD_MENU_ITEMS });
    }
    setOpenConfirmEditModal(false);
  }

  const handleClickSave = () => {
    setOpenConfirmEditModal(true)
  }

  const handleClickDelete = () => {
    setOpenConfirmDeleteModal(true);
  }

  const handleClickCancel = useCallback(() => {
    if (detectedFormChange) {
      setOpenConfirmCancelModal(true)
    } else {
      handleConfirmCancel();
    }
  }, [detectedFormChange, handleConfirmCancel])

  return (
    <Dialog open={open} onClose={props.handleCancel} fullWidth maxWidth='lg' >
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {isEdit ? "Edit Menu Item" : "Create New Menu Item"}
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="space-around">
          <Grid item md={6} sm={12}>
            <CreateMenuForm />
          </Grid>

          <Grid item md={5} sm={12}>
            {/* Options */}
            <CreateMenuOptions
              menuOptions={menuFormState?.options}
              handleAddOption={handleAddOption}
              handleAddOptionItem={handleAddOptionItem}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingRight: "1.5rem", paddingBottom: '1.5rem' }}>
        <Button variant="contained" color="success" disabled={!detectedFormChange} onClick={handleClickSave}>Save</Button>
        {isEdit ? (
          <Button variant="contained" color="error" onClick={handleClickDelete}>Delete</Button>
        ) : ""}
        <Button variant="outlined" color="success" onClick={handleClickCancel}>Cancel</Button>
      </DialogActions>

      <ConfirmationModal
        open={openConfirmDeleteModal}
        accept={handleConfirmDelete}
        decline={() => setOpenConfirmDeleteModal(false)}
        message="Are you sure you want to delete this item?"
      />

      <ConfirmationModal
        open={openConfirmCancelModal}
        accept={handleConfirmCancel}
        decline={() => setOpenConfirmCancelModal(false)}
        message="Are you sure you want to cancel?"
      />

      <ConfirmationModal
        open={openConfirmEditModal}
        accept={handleConfirmEdit}
        decline={() => setOpenConfirmEditModal(false)}
        message="Are you sure you want to save this item"
      />
    </Dialog>
  )
}
