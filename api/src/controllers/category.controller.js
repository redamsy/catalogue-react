import responseHandler from "../handlers/response.handler.js";
import categoryModel from "../models/category.model.js";

const create = async (req, res) => {
  try {
    const category = new categoryModel({
      ...req.body
    });

    await category.save();

    responseHandler.created(res, {
      ...category._doc,
      id: category.id,
    });
  } catch(error) {
    console.log("categoryController: error", error);
    responseHandler.error(res);
  }
};

const update = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await categoryModel.findById(categoryId).select("id name");

    if (!category) return responseHandler.notfound(res);

    category.name = name;

    await category.save();

    responseHandler.ok(res, {
      ...category._doc,
      id: category.id,
    });
  } catch(error) {
    console.log("categoryController: error", error);
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  console.log("categoryController: remove: req.params", req.params)
  try {
    const { categoryId } = req.params;

    const category = await categoryModel.findOne({
      _id: categoryId,
    });

    if (!category) return responseHandler.notfound(res);

    await category.deleteOne();

    responseHandler.ok(res);
  } catch(error) {
    console.log("categoryController: error", error);
    responseHandler.error(res);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort("-createdAt");

    responseHandler.ok(res, categories);
  } catch(error) {
    console.log("categoryController: error", error);
    responseHandler.error(res);
  }
};

export default { create, update, remove, getCategories };