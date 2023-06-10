import React, { memo, useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { Product } from "../models/Product";

interface IProps {
  product: Product;
  handleUpdateOpen: (product: Product) => Promise<void>;
  handleDeleteOpen: (id: string) => void;
  handleMarkAsCompleted: (data: Product) => Promise<void>;
}
// eslint-disable-next-line react/display-name
const ProductListItem = memo(
  ({
    product,
    handleUpdateOpen,
    handleDeleteOpen,
    handleMarkAsCompleted,
  }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <ListItem key={product.id} disableGutters>
        <ListItemText primary={`Title: ${product.title}`} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => {
              handleUpdateOpen(product);
            }}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            data-user={product.id}
            onClick={() => {
              handleDeleteOpen(product.id);
            }}>
            <DeleteIcon />
          </IconButton>
          {!isLoading && (
            <IconButton
              edge="end"
              aria-label="delete"
              data-user={product.id}
              onClick={async () => {
                setIsLoading(true);
                await handleMarkAsCompleted(product);
                setIsLoading(false);
                return;
              }}>
              <FlagIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

export default ProductListItem;
