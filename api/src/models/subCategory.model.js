import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "SubCategory",
  mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required : [true, 'Please add a SubCategory Name'],  
    },
  }, modelOptions)
);