import { Box, Button, Dialog, DialogActions, DialogContent } from "@mui/material"

interface ConfirmationModal {
  open: boolean;
  accept?: () => void;
  decline?: () => void;
  message?: string;
}

export default function ConfirmationModal({ open, message, accept, decline }: ConfirmationModal) {

  function handleAccept() {
    accept && accept();
  }

  function handleDecline() {
    decline && decline();
  }

  return (
    <Dialog open={Boolean(open)}>
      <DialogContent>
        <Box>
          {message ?? "Confirm changes?"}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept}>Yes</Button>
        <Button onClick={handleDecline}>No</Button>
      </DialogActions>
    </Dialog>
  )
}
