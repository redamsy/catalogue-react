import React, { memo, useState } from "react";
import CircularProgressPage from "./CircularProgressPage";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { IProductBody, Product } from "../models/Product";
import { useAppActions } from "../providers/actionsProvider";
import DeleteDialog from "./DeleteDialog";
import UpdateProductModal from "./UpdateProductModal";
import CreateProductModal from "./CreateProductModal";
import { ProductsGroupedByDay } from "./ProductListWrapper";
import {
  AppBar,
  createTheme,
  Divider,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import SwitchRemainingFinished from "./SwitchRemainingFinished";
import ProductListItem from "./ProductListItem";
import moment from "moment";

function appBarLabel(label: string) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

interface Props {
  products: Product[];
  remainingProductsGroupedByDay: ProductsGroupedByDay[];
  finishedProductsGroupedByDay: ProductsGroupedByDay[];
  loading: boolean;
  getProducts: () => Promise<void>;
}

// eslint-disable-next-line react/display-name
const AbstractCarousel = memo(
  ({
    products,
    remainingProductsGroupedByDay,
    finishedProductsGroupedByDay,
    loading,
    getProducts,
  }: Props) => {
    const appActions = useAppActions();

    const [createOpen, setCreateOpen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [idToDelete, setIdToDelete] = React.useState<string>("");
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleDeleteOpen = (id: string) => {
      setIdToDelete(id);
      setOpenAlert(true);
    };
    const handleDeleteClose = () => {
      setOpenAlert(false);
    };

    const handleRemoveProduct = async (id: string) => {
      if (appActions) {
        await appActions.deleteCurrentUserProduct(id);
        await getProducts();
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

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    async function handleMarkAsCompleted(data: Product) {
      const { completed, ...rest } = data;
      const payload: IProductBody = {
        completed: true,
        ...rest,
      };
      if (appActions) {
        const { status } = await appActions.updateCurrentUserProduct(payload);
        if (status === 200) {
          alert("marked to-do as completed successfully ");
          await getProducts();
        } else {
          alert("Failed to marked to-do as completed");
        }
      }
    }

    const ProductsComp = (productsGroupedByDay: ProductsGroupedByDay[]) => (
      <>
        {productsGroupedByDay.map((group) => {
          const { day, products } = group;
          return (
            <>
              <ThemeProvider theme={darkTheme}>
                <AppBar
                  position="static"
                  color="primary"
                  key={day.toLocaleDateString()}>
                  {appBarLabel(day.toLocaleDateString())}
                </AppBar>
              </ThemeProvider>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}>
                {products
                  .sort((a, b) => {
                    if (a.priority < b.priority) {
                      return -1;
                    }
                    if (a.priority > b.priority) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      handleUpdateOpen={handleUpdateOpen}
                      handleDeleteOpen={handleDeleteOpen}
                      handleMarkAsCompleted={handleMarkAsCompleted}
                    />
                  ))}
              </List>
            </>
          );
        })}
      </>
    );
    return (
      <>
        {loading ? (
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
              <SwitchRemainingFinished
                checked={checked}
                handleChange={handleChange}
              />
            </List>
            <Divider />
            {checked
              ? ProductsComp(remainingProductsGroupedByDay)
              : ProductsComp(finishedProductsGroupedByDay)}
          </>
        )}
        {createOpen && (
          <CreateProductModal
            open={createOpen}
            onClose={handleCreateClose}
            getProducts={getProducts}
          />
        )}
        {productToUpdate && (
          <UpdateProductModal
            open={updateOpen}
            onClose={handleUpdateClose}
            product={productToUpdate}
            getProducts={getProducts}
          />
        )}
        <DeleteDialog
          open={openAlert}
          onCancel={() => handleDeleteClose()}
          onDelete={() => handleRemoveProduct(idToDelete)}
        />
      </>
    );
  }
);

export default AbstractCarousel;
