import express from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import productController from "../controllers/product.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  tokenMiddleware.auth,
  productController.getProducts
);

router.post(
  "/",
  tokenMiddleware.auth,
  body("title")
    .exists().withMessage("Product title is required")
    .isLength({ min: 1, max: 50 }).withMessage("Product title can not be empty (min: 1, max: 50)"),
  body("description")
    .exists().withMessage("Product description is required")
    .isLength({ min: 1, max: 255 }).withMessage("Product description can not be empty (min: 1, max: 255)"),
  body("imageUrl")
    .exists().withMessage("Product image url is required")
    .isLength({ min: 1, max: 150 }).withMessage("Product image url can not be empty (min: 1, max: 255)"),
  body('price')
    .exists().withMessage('Product price is required')
    .isNumeric().withMessage('Product price must be a valid number')
    .custom((value) => value >= 0).withMessage('Product price must be a non-negative number'),
  body("remaining")
    .exists().withMessage("Remaining quantity is required")
    .isInt({ min: 0, max: 9999 }).withMessage("Invalid remaining quantity"),
  body("pSCCs")
    .exists().withMessage("PSCCs array is required")
    .isArray().withMessage("PSCCs must be an array")
    .custom((value) => {
      if (!value.every((pSCC) => mongoose.Types.ObjectId.isValid(pSCC.categoryId) && mongoose.Types.ObjectId.isValid(pSCC.subCategoryId) && pSCC.categoryId.length > 0 && typeof pSCC.categoryId === "string" && pSCC.subCategoryId.length > 0 && typeof pSCC.subCategoryId === "string" )) {
        throw new Error("Each pSCC object must have categoryId and subCategoryId of type string");
      }
      return true;
    }),
  requestHandler.validate,
  productController.create
);

router.put(
  "/:productId",
  tokenMiddleware.auth,
  body("title")
    .exists().withMessage("Product title is required")
    .isLength({ min: 1, max: 50 }).withMessage("Product title can not be empty (min: 1, max: 50)"),
  body("description")
    .exists().withMessage("Product description is required")
    .isLength({ min: 1, max: 255 }).withMessage("Product description can not be empty (min: 1, max: 255)"),
  body("imageUrl")
    .exists().withMessage("Product image url is required")
    .isLength({ min: 1, max: 150 }).withMessage("Product image url can not be empty (min: 1, max: 255)"),
  body('price')
    .exists().withMessage('Product price is required')
    .isNumeric().withMessage('Product price must be a valid number')
    .custom((value) => value >= 0).withMessage('Product price must be a non-negative number'),
  body("remaining")
    .exists().withMessage("Remaining quantity is required")
    .isInt({ min: 0, max: 9999 }).withMessage("Invalid remaining quantity"),
  body("pSCCs")
    .exists().withMessage("PSCCs array is required")
    .isArray().withMessage("PSCCs must be an array")
    .custom((value) => {
      if (!value.every((pSCC) => mongoose.Types.ObjectId.isValid(pSCC.categoryId) && mongoose.Types.ObjectId.isValid(pSCC.subCategoryId) && pSCC.categoryId.length > 0 && typeof pSCC.categoryId === "string" && pSCC.subCategoryId.length > 0 && typeof pSCC.subCategoryId === "string" )) {
        throw new Error("Each pSCC object must have categoryId and subCategoryId of type string");
      }
      return true;
    }),
  requestHandler.validate,
  productController.update
);

router.delete(
  "/:productId",
  tokenMiddleware.auth,
  productController.remove
);

export default router;