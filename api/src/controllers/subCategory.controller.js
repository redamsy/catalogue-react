import responseHandler from "../handlers/response.handler.js";
import {subCategoryModel} from "../models/user.model.js";

const create = async (req, res) => {
  try {
    const subCategory = new subCategoryModel({
      ...req.body
    });

    await subCategory.save();

    responseHandler.created(res, {
      ...subCategory._doc,
      id: subCategory.id,
    });
  } catch(error) {
    console.log("subCategoryController: error", error);
    responseHandler.error(res);
  }
};

const update = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const { name } = req.body;

    const subCategory = await subCategoryModel.findById(subCategoryId).select("id name");

    if (!subCategory) return responseHandler.notfound(res);

    subCategory.name = name;

    await subCategory.save();

    responseHandler.ok(res, {
      ...subCategory._doc,
      id: subCategory.id,
    });
  } catch(error) {
    console.log("subCategoryController: error", error);
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  console.log("subCategoryController: remove: req.params", req.params)
  try {
    const { subCategoryId } = req.params;

    const subCategory = await subCategoryModel.findOne({
      _id: subCategoryId,
    });

    if (!subCategory) return responseHandler.notfound(res);

    await subCategory.deleteOne();

    responseHandler.ok(res);
  } catch(error) {
    console.log("subCategoryController: error", error);
    responseHandler.error(res);
  }
};

const getSubCategories = async (req, res) => {
  try {
    const categories = await subCategoryModel.find().sort("-createdAt");

    responseHandler.ok(res, categories);
  } catch(error) {
    console.log("subCategoryController: error", error);
    responseHandler.error(res);
  }
};

export default { create, update, remove, getSubCategories };