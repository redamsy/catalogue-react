import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useForm } from "react-hook-form";
import { IProductBody, IProductForm, Priority } from "../models/Product";
import { useAppActions } from "../providers/actionsProvider";
import Grid from "@mui/material/Grid";

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
  getProducts: () => Promise<void>;
}

// eslint-disable-next-line react/display-name
const CreateProductModal = memo(({ open, onClose, getProducts }: Props) => {
  const appActions = useAppActions();

  const [isLoading, setIsLoading] = useState(false);
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
    const { id, title, description, date, priority, completed } = getValues();
    const payload: IProductBody = {
      id,
      title,
      description,
      priority,
      completed: false,
      date: moment(date).local().toDate(),
    };
    console.log("CreateProductModal: payload", payload);
    if (appActions) {
      setIsLoading(true);
      const { status } = await appActions.createProduct(payload);
      if (status === 201) {
        alert("Product successfully updated");
        await getProducts();
      } else {
        alert("Failed to update Product");
      }
      setIsLoading(false);
    }
  }

  const greaterThanToday = (value: string) => {
    const date = new Date(value);
    return date.getTime() >= Date.now() || "Date/time must be after today";
  };

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
            <Grid xs={12}>
              <TextField
                id="date"
                required
                label="date"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("date", {
                  required: "Start Date is required",
                  validate: { greaterThanToday },
                })}
                error={!!errors.date}
                helperText={errors.date ? errors.date.message : null}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="label">Priority</InputLabel>
              <Select required native id="priority" {...register("priority")}>
                {Object.entries(Priority).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {isLoading ? <>Please wait..</> : <>Create</>}
          </Button>
        </Box>
      </Modal>
    </div>
  );
});

export default CreateProductModal;
