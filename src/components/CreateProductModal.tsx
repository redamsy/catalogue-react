import React, { memo, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm, useFieldArray  } from "react-hook-form";
import { IProductBody } from "../models/Product";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useProductActions, useProductState } from "../context/productsContext";
import { useCategoryState } from "../context/categoriesContext";
import { useSubCategoryState } from "../context/subCategoriesContext";

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
}

// eslint-disable-next-line react/display-name
const CreateProductModal = memo(({ open, onClose }: Props) => {
  const productActions = useProductActions();
  const { isCreating } = useProductState();
  const { categories } = useCategoryState();
  const { subCategories } = useSubCategoryState();


  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductBody>({
    shouldUnregister: false,
    defaultValues: {
      pSCCs: [{ categoryId: '', subCategoryId: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pSCCs'
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  //TODO: useCalBack
  const onSubmit = useCallback(async (data: IProductBody) => {
    console.log("CreateProductModal: data", data);
    const { id, title, description, imageUrl, price, remaining, pSCCs } = data;
    const payload: IProductBody = {
      id,
      title,
      description,
      imageUrl,
      price,
      remaining,
      pSCCs: pSCCs.map((el) => {
        return {
          categoryId: el.categoryId,
          subCategoryId: el.subCategoryId
        }
      })
    };
    if (productActions) {
      try {
        await productActions.createNewProduct(payload);
        handleClose(); 
      } catch (err) {
        console.error(err);     
      }
    }
  }, [handleClose, productActions]);
  
  // Render function for the PSCC array
  const renderPSCCArray = () => (
    <>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          // error={!!errors.categoryId}
          {...register('title')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map(({id, name}) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {fields.map((fieldEl, index) => (
        <div key={index}>
          <FormControl sx={{ width: '48%', margin: '0 4% 0 0'}}>
            <InputLabel id={`${fieldEl.id}-category-select-label`}>Category</InputLabel>
            <Controller
              rules={{required: 'Category is required'}}
              control={control}
              name={`pSCCs.${index}.categoryId`}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    label="Category"
                    labelId={`${fieldEl.id}-category-select-label`}
                    id={`${fieldEl.id}-category-select`}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors?.pSCCs?.[index]?.categoryId && (
                    <FormHelperText error={!!errors?.pSCCs?.[index]?.categoryId}>
                      {errors?.pSCCs?.[index]?.categoryId?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>

          <FormControl sx={{ width: '48%'}}>
            <InputLabel id={`${fieldEl.id}-subcategory-select-label`}>Sub Category</InputLabel>
            <Controller
              rules={{required: 'Category is required'}}
              control={control}
              name={`pSCCs.${index}.subCategoryId`}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    label="Sub Category"
                    labelId={`${fieldEl.id}-subcategory-select-label`}
                    id={`${fieldEl.id}-subcategory-select`}
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors?.pSCCs?.[index]?.subCategoryId && (
                    <FormHelperText error={!!errors?.pSCCs?.[index]?.subCategoryId}>
                      {errors?.pSCCs?.[index]?.subCategoryId?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
          <Button
            variant="outlined"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            Add
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
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
              <Grid item xs={12}>
                <TextField
                  autoComplete="price"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  {...register("price", {
                    required: 'Product price is required',
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Product price must be a valid number with up to 2 decimal places',
                    },
                  })}
                  error={!!errors.price}
                  helperText={errors.price ? errors.price.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="remaining"
                  required
                  fullWidth
                  id="remaining"
                  label="Number of Remaining Products"
                  type="number"
                  inputProps={{ step: '1' }} // Set step attribute to '1' to allow only whole numbers
                  {...register('remaining', {
                    required: 'Number of remaining products is required',
                    min: { value: 0, message: 'Number of remaining products must be at least 0' },
                    max: { value: 9999, message: 'Number of remaining products cannot exceed 9999' },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Number of remaining products must be an integer',
                    },
                  })}
                  error={!!errors.remaining}
                  helperText={errors.remaining?.message || null}
                />
              </Grid>
              <Grid item xs={12}>
                {renderPSCCArray()}

                <button type="button" onClick={() => append({ categoryId: '', subCategoryId: '' })}>
                  Add PSCC
                </button>
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
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default CreateProductModal;
