import express from "express";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import categoryRoute from "./category.route.js";
import subCategoryRoute from "./subCategory.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
// router.use("/subcategories", subCategoryRoute);

export default router;