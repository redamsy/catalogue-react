import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const pSCCSchema = new mongoose.Schema({
  productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required : [true, 'PSCC must belong to a category'],

  },
  categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required : [true, 'PSCC must belong to a category'],

  },
  subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required : [true, 'PSCC must belong to a subCategory'],
  },
}, modelOptions);

pSCCSchema.index({ productId: 1, categoryId: 1, subCategoryId: 1 }, { unique: true });


const PSCCModel = mongoose.model('PSCC', pSCCSchema);

export default PSCCModel;