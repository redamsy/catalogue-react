import express from "express";
import { body } from "express-validator";
import categoryController from "../controllers/category.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  tokenMiddleware.auth,
  categoryController.getCategories
);

router.post(
  "/",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("Category name is required")
    .isLength({ min: 1, max: 50 }).withMessage("Category name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.create
);

router.put(
  "/:categoryId",
  tokenMiddleware.auth,
  body("name")
    .exists().withMessage("Category name is required")
    .isLength({ min: 1, max: 50 }).withMessage("Category name can not be empty (min: 1, max: 50)"),
  requestHandler.validate,
  categoryController.update
);

router.delete(
  "/:categoryId",
  tokenMiddleware.auth,
  categoryController.remove
);

export default router;