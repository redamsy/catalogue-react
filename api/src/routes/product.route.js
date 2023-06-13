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
    .isLength({ min: 1, max: 50 }).withMessage("Product title can not be empty (min: 1, max: 50)"),
  body("description")
    .exists().withMessage("Product description is required")
    .isLength({ min: 1, max: 255 }).withMessage("Product description can not be empty (min: 1, max: 255)"),
    body("imageUrl")
      .exists().withMessage("Product image url is required")
      .isLength({ min: 1, max: 150 }).withMessage("Product image url can not be empty (min: 1, max: 255)"),
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
  requestHandler.validate,
  productController.update
);

router.delete(
  "/:productId",
  tokenMiddleware.auth,
  productController.remove
);

export default router;