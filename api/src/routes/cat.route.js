import express from "express";
import { body } from "express-validator";
import categoryController from "../controllers/category.controller.js";
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
  categoryController.createCategory
);

router.put(
  "/categories/:categoryId",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("Category name is required")
    .isLength({ min: 1, max: 50 }).withMessage("Category name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.updateCategory
);

router.delete(
  "/categories/:categoryId",
  tokenMiddleware.auth,
  categoryController.removeCategory
);

router.get(
  "/subCategories/",
  tokenMiddleware.auth,
  categoryController.getSubCategories
);

router.post(
  "/subCategories/",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("SubCategory name is required")
    .isLength({ min: 1, max: 50 }).withMessage("SubCategory name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.createSubCategory
);

router.put(
  "/subCategories/:subCategoryId",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("SubCategory name is required")
    .isLength({ min: 1, max: 50 }).withMessage("SubCategory name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.updateSubCategory
);

router.delete(
  "/subCategories/:subCategoryId",
  tokenMiddleware.auth,
  categoryController.removeSubCategory
);

export default router;