import responseHandler from "../handlers/response.handler.js";
import productModel from "../models/product.model.js";

const create = async (req, res) => {
  try {
    const product = new productModel({
      ...req.body
    });

    await product.save();

    responseHandler.created(res, {
      ...product._doc,
      id: product.id,
    });
  } catch(error) {
    console.log("productController: error", error);
    responseHandler.error(res);
  }
};

const update = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description } = req.body;

    const product = await productModel.findById(productId).select("description id title createdAt updatedAt");

    if (!product) return responseHandler.unauthorize(res);

    product.title = title;
    product.description = description;

    await product.save();

    responseHandler.ok(res, {
      ...product._doc,
      id: product.id,
    });
  } catch(error) {
    console.log("productController: error", error);
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  console.log("productController: remove: req.params", req.params)
  try {
    const { productId } = req.params;

    const product = await productModel.findOne({
      _id: productId,
    });

    if (!product) return responseHandler.notfound(res);

    await product.deleteOne();

    responseHandler.ok(res);
  } catch(error) {
    console.log("productController: error", error);
    responseHandler.error(res);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort("-createdAt");

    responseHandler.ok(res, products);
  } catch(error) {
    console.log("productController: error", error);
    responseHandler.error(res);
  }
};

export default { create, update, remove, getProducts };