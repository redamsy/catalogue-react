import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Category",
  mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required : [true, 'Please add a category Name'],  
    },
  }, modelOptions)
);
