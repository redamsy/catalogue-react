import responseHandler from "../handlers/response.handler.js";
import {categoryModel} from "../models/user.model.js";
import {subCategoryModel} from "../models/user.model.js";

const createCategory = async (req, res) => {
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

const updateCategory = async (req, res) => {
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

const removeCategory = async (req, res) => {
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


const createSubCategory = async (req, res) => {
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

const updateSubCategory = async (req, res) => {
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

const removeSubCategory = async (req, res) => {
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

export default {
  createCategory,
  updateCategory,
  removeCategory,
  getCategories,
  createSubCategory,
  updateSubCategory,
  removeSubCategory,
  getSubCategories
};
