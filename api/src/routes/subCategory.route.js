import express from "express";
import { body } from "express-validator";
import subCategoryController from "../controllers/subCategory.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/subCategory/",
  tokenMiddleware.auth,
  subCategoryController.getSubCategories
);

router.post(
  "/subCategory/",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("SubCategory name is required")
    .isLength({ min: 1, max: 50 }).withMessage("SubCategory name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  subCategoryController.create
);

router.put(
  "/subCategory/:subCategoryId",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("SubCategory name is required")
    .isLength({ min: 1, max: 50 }).withMessage("SubCategory name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  subCategoryController.update
);

router.delete(
  "/subCategory/:subCategoryId",
  tokenMiddleware.auth,
  subCategoryController.remove
);

export default router;