import React, { memo } from "react";
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
}
// eslint-disable-next-line react/display-name
const ProductListItem = memo(
  ({
    product,
    handleUpdateOpen,
    handleDeleteOpen,
  }: IProps) => {
    const newDate = new Date(product.createdAt);
    const date = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    );

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
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

export default ProductListItem;
