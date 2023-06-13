import React, { memo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { IProductBody, Product } from "../models/Product";
import Grid from "@mui/material/Grid";
import { useProductActions, useProductState } from "../context/productsContext";

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  open: boolean;
  onClose: () => void;
  product: Product;
}

// eslint-disable-next-line react/display-name
const UpdateProductModal = memo(({ open, onClose, product }: Props) => {
  const productActions = useProductActions();
  const { isUpdating } = useProductState();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductBody>({
    defaultValues: {
      id: product.id,
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
    },
    shouldUnregister: false,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  async function onSubmit(data: IProductBody) {
    console.log("UpdateProductModal: onSubmit: data", data);
    const { id, title, description, imageUrl } = data;
    const payload: IProductBody = {
      id,
      title,
      description,
      imageUrl,
    };
    if (productActions) {
      try {
        await productActions.updateCurrentProduct(payload);
        handleClose();      
      } catch (err) {
        console.error(err);    
      }
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            Edit
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={style}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  id="id"
                  label="id"
                  autoFocus
                  {...register("id")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  autoFocus
                  {...register("title", {
                    required: true,
                    minLength: { value: 1, message: "min: 1 character"},
                    maxLength: { value: 50, message: "max: 50 characters"},
                  })}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="description"
                  required
                  fullWidth
                  id="description"
                  label="description"
                  autoFocus
                  {...register("description", {
                    required: true,
                    minLength: { value: 1, message: "min: 1 character"},
                    maxLength: { value: 255, message: "max: 255 characters"},
                  })}
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description.message : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="imageUrl"
                  required
                  fullWidth
                  id="imageUrl"
                  label="Google Drive Public Image Url"
                  autoFocus
                  {...register("imageUrl", {
                    required: true,
                    minLength: { value: 1, message: "min: 1 character"},
                    maxLength: { value: 150, message: "max: 150 characters"},
                  })}
                  error={!!errors.imageUrl}
                  helperText={
                    errors.imageUrl ? errors.imageUrl.message : null
                  }
                />
              </Grid>
            </Grid>
            <Button
              disabled={isUpdating}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {isUpdating ? <>Please wait..</> : <>Update</>}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default UpdateProductModal;
