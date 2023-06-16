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
import { ISubCategoryBody, SubCategory } from "../models/SubCategory";
import Grid from "@mui/material/Grid";
import { useSubCategoryActions, useSubCategoryState } from "../context/subCategoriesContext";

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
  subCategory: SubCategory;
}

// eslint-disable-next-line react/display-name
const UpdateSubCategoryModal = memo(({ open, onClose, subCategory }: Props) => {
  const subCategoryActions = useSubCategoryActions();
  const { isUpdating } = useSubCategoryState();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubCategoryBody>({
    defaultValues: {
      id: subCategory.id,
      name: subCategory.name,
    },
    shouldUnregister: false,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  //TODO: useCalBack
  async function onSubmit(data: ISubCategoryBody) {
    console.log("UpdateSubCategoryModal: onSubmit: data", data);
    const { id, name } = data;
    const payload: ISubCategoryBody = {
      id,
      name,
    };
    if (subCategoryActions) {
      try {
        await subCategoryActions.updateCurrentSubCategory(payload);
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
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-name"
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
                  autoComplete="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  {...register("name", {
                    required: true,
                    minLength: { value: 1, message: "min: 1 character"},
                    maxLength: { value: 50, message: "max: 50 characters"},
                  })}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : null}
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

export default UpdateSubCategoryModal;
