import React, { memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useProductActions } from "../context/productsContext";
interface IProps {
  id: string;
  open: boolean;
  isDeleting: boolean;
  onCancel: () => void;
}
// eslint-disable-next-line react/display-name
const DeleteAlertDialog = memo(({ id, open, isDeleting, onCancel }: IProps) => {
  const productActions = useProductActions();

  const handleRemoveProduct = async () => {
    if (productActions) {
      await productActions.deleteCurrentProduct(id);
      onCancel();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">delete?</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          click to delete permenently
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRemoveProduct} color="primary" autoFocus disabled={isDeleting}>
            {isDeleting ? <>Please wait..</> : <>Delete</>}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default DeleteAlertDialog;
