import express from "express";
import { body } from "express-validator";
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
    .isLength({ min: 1 }).withMessage("Product title can not be empty"),
  body("description")
    .exists().withMessage("Product description is required")
    .isLength({ min: 1 }).withMessage("Product description can not be empty"),
  requestHandler.validate,
  productController.create
);

router.put(
  "/:productId",
  tokenMiddleware.auth,
  body("title")
    .exists().withMessage("Product title is required")
    .isLength({ min: 1 }).withMessage("Product title can not be empty"),
  body("description")
    .exists().withMessage("Product description is required")
    .isLength({ min: 1 }).withMessage("Product description can not be empty"),
  requestHandler.validate,
  productController.update
);

router.delete(
  "/:productId",
  tokenMiddleware.auth,
  productController.remove
);

export default router;