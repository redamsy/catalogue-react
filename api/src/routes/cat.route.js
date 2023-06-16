import express from "express";
import { body } from "express-validator";
import categoryController from "../controllers/category.controller.js";
import subCategoryController from "../controllers/subCategory.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/categories/",
  tokenMiddleware.auth,
  categoryController.getCategories
);

router.post(
  "/categories/",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("Category name is required")
    .isLength({ min: 1, max: 50 }).withMessage("Category name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.create
);

router.put(
  "/categories/:categoryId",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("Category name is required")
    .isLength({ min: 1, max: 50 }).withMessage("Category name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.update
);

router.delete(
  "/categories/:categoryId",
  tokenMiddleware.auth,
  categoryController.remove
);

router.get(
  "/subCategories/",
  tokenMiddleware.auth,
  subCategoryController.getSubCategories
);

router.post(
  "/subCategories/",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("SubCategory name is required")
    .isLength({ min: 1, max: 50 }).withMessage("SubCategory name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  subCategoryController.create
);

router.put(
  "/subCategories/:subCategoryId",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("SubCategory name is required")
    .isLength({ min: 1, max: 50 }).withMessage("SubCategory name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  subCategoryController.update
);

router.delete(
  "/subCategories/:subCategoryId",
  tokenMiddleware.auth,
  subCategoryController.remove
);

export default router;