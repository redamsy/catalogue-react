import React, { memo, useState } from "react";
import CircularProgressPage from "./CircularProgressPage";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Product } from "../models/Product";
import DeleteDialog from "./DeleteDialog";
import UpdateProductModal from "./UpdateProductModal";
import CreateProductModal from "./CreateProductModal";
import {
  AppBar,
  createTheme,
  Divider,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import ProductListItem from "./ProductListItem";
import moment from "moment";
import { useProductActions, useProductState } from "../context/productsContext";import {
  Alert,
  InputAdornment,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

// eslint-disable-next-line react/display-name
const AbstractCarousel = memo(
  () => {
    const productActions = useProductActions();
    const { products, loadingData, isDeleting, createError, updateError, deleteError, openSnack } = useProductState();

    const [createOpen, setCreateOpen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [idToDelete, setIdToDelete] = React.useState<string>("");
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const handleClose = () => {
      productActions.clearErrorsAndCloseSnack();
    };
  
    const handleDeleteOpen = (id: string) => {
      setIdToDelete(id);
      setDeleteOpen(true);
    };
    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };

    const handleRemoveProduct = async (id: string) => {
      if (productActions) {
        await productActions.deleteCurrentProduct(id);
        handleDeleteClose();
      }
    };

    const handleCreateOpen = () => {
      setCreateOpen(true);
    };

    const handleCreateClose = () => {
      setCreateOpen(false);
    };

    const handleUpdateClose = () => {
      setUpdateOpen(false);
      setProductToUpdate(null);
    };

    const handleUpdateOpen = async (product: Product) => {
      setProductToUpdate(product);
      setUpdateOpen(true);
    };

    const ProductsComp = () => (
      <>
        <ThemeProvider theme={darkTheme}>
          <AppBar
            position="static"
            color="primary"
          >
            Products
          </AppBar>
        </ThemeProvider>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}>
          {products.map((product) => (
              <ProductListItem
                key={product.id}
                product={product}
                handleUpdateOpen={handleUpdateOpen}
                handleDeleteOpen={handleDeleteOpen}
              />
            ))}
        </List>
      </>
    );
  return (
      <>
        {loadingData ? (
          <CircularProgressPage />
        ) : (
          <>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}>
              <IconButton
                style={{ marginBottom: "20px" }}
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleCreateOpen();
                }}>
                <AddIcon />
              </IconButton>
            </List>
            <Divider />
            {ProductsComp()}
          </>
        )}
        {createOpen && (
          <CreateProductModal
            open={createOpen}
            onClose={handleCreateClose}
          />
        )}
        {productToUpdate && (
          <UpdateProductModal
            open={updateOpen}
            onClose={handleUpdateClose}
            product={productToUpdate}
          />
        )}
        <DeleteDialog
          open={deleteOpen}
          isDeleting={isDeleting}
          onCancel={() => handleDeleteClose()}
          onDelete={() => handleRemoveProduct(idToDelete)}
        />
        {openSnack ? (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openSnack}
          autoHideDuration={7000}
          onClose={handleClose}
        >
          {(!updateError && !updateError && !deleteError) ? (
            <Alert onClose={handleClose} severity="success">
              Succesful
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              {createError || updateError || deleteError}
            </Alert>
          )}
        </Snackbar>
        ) : (<></>)}
      </>
    );
  }
);

export default AbstractCarousel;
