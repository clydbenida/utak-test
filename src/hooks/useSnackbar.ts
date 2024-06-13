import { closeSnackbar } from "../redux/app/appReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks"

export default function useSnackbar() {
  const { open, message } = useAppSelector(state => state.app.snackbar);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(closeSnackbar());
  }
  return {
    open,
    handleClose,
    message,
  }
}
