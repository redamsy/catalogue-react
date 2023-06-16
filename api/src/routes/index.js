import express from "express";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import catRoute from "./cat.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/products", productRoute);
router.use("/cats", catRoute);

export default router;