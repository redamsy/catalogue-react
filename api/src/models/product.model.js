import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Product",
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    imageUrl: {
      type: String,
      required: true,
      maxlength: 150,
    },
  }, modelOptions)
);