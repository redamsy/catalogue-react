import React, { memo, useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useForm } from "react-hook-form";
import { IProductBody, IProductForm } from "../models/Product";
import Grid from "@mui/material/Grid";
import { useProductActions, useProductState } from "../context/productsContext";

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

// eslint-disable-next-line react/display-name
const CreateProductModal = memo(({ open, onClose }: Props) => {
  const productActions = useProductActions();
  const { isCreating } = useProductState();


  const {
    setValue,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductForm>({
    shouldUnregister: false,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  async function onSubmit(data: IProductForm) {
    console.log("CreateProductModal: data", data);
    const { id, title, description } = getValues();
    const payload: IProductBody = {
      id,
      title,
      description,
    };
    console.log("CreateProductModal: payload", payload);
    if (productActions) {
      try {
        await productActions.createNewProduct(payload);
        handleClose(); 
      } catch (err) {
        console.error(err);     
      }
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={style}>
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
                  required: "min: 5, max: 255",
                  minLength: 5,
                  maxLength: 255,
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
                  required: "min: 5, max: 2000",
                  minLength: 5,
                  maxLength: 255,
                })}
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : null
                }
              />
            </Grid>
          </Grid>
          <Button
            disabled={isCreating}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {isCreating ? <>Please wait..</> : <>Create</>}
          </Button>
        </Box>
      </Modal>
    </div>
  );
});

export default CreateProductModal;
