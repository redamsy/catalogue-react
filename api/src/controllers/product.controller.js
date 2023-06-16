import mongoose from "mongoose";
import responseHandler from "../handlers/response.handler.js";
import { productModel, categoryModel, subCategoryModel, pSCCModel } from "../models/user.model.js";

const checkExistence = async(res, pSCCs) => {
  const categoryIds = pSCCs.map((pSCC) => pSCC.categoryId);
  const subCategoryIds = pSCCs.map((pSCC) => pSCC.subCategoryId);

  // Fetch all categories and subcategories in a single query
  const categories = await categoryModel.find({ _id: { $in: categoryIds } }).lean();
  const subCategories = await subCategoryModel.find({ _id: { $in: subCategoryIds } }).lean();

  const categoryMap = categories.reduce((map, category) => {
    map[category._id.toString()] = category;
    return map;
  }, {});

  const subCategoryMap = subCategories.reduce((map, subCategory) => {
    map[subCategory._id.toString()] = subCategory;
    return map;
  }, {});

  for (const pSCC of pSCCs) {
    const { categoryId, subCategoryId } = pSCC;
    const category = categoryMap[categoryId];
    if (!category) {
      return "Field categoryId doesn't match data in category table";
    }

    const subCategory = subCategoryMap[subCategoryId];
    if (!subCategory) {
      return "Field subCategoryId doesn't match data in subCategory table"
    }
  }
  return null;
}

const checkDuplicates = async(res, pSCCs) => {
  const duplicatePSCCs = pSCCs.filter(
    (pSCC, index) =>
      pSCCs.findIndex(
        (r) =>
          r.categoryId === pSCC.categoryId &&
          r.subCategoryId === pSCC.subCategoryId &&
          index !== pSCCs.indexOf(r)
      ) !== -1
  );

  if (duplicatePSCCs.length > 0) {
    return true;
  }
  return false
}
// const pSCCs = [{categoryId: 1, subCategoryId: 1}]
const create = async (req, res) => {
  try {
    const { title, description, imageUrl, price, remaining, pSCCs } = req.body;

    //check for duplicates here
    const isDuplicate = await checkDuplicates(res, pSCCs)
    if(isDuplicate) {
      return responseHandler.badrequest(
        res,
        "Duplicate entries found in the pSCCs array"
      );
    }

    // check that all categories and subCategories exist in their respective tables
    const existenceError = await checkExistence(res, pSCCs)
    if(existenceError) {
      return responseHandler.badrequest(
        res,
        existenceError
      );
    }

    const product = new productModel({
      title, description, imageUrl, price, remaining,
    });

    await product.save();

    //add batch to pSCC table
    try {
      await pSCCModel.insertMany(
        pSCCs.map((pSCC) => ({
          productId: product.id,
          categoryId: pSCC.categoryId,
          subCategoryId: pSCC.subCategoryId,
        }))
      );      
    } catch (error) {
      // Handle the error when inserting PSCCs
      // Rollback or perform necessary actions
    //TODO: solve delete many incase error(currently old data are lost)
      await pSCCModel.deleteMany({ productId: product.id });
      if(product) {
        await product.deleteOne();
      }
      console.log("productController: create: Error while inserting pSCCs:", error);
      throw error; // Rethrow the error to be handled by the catch block below
      
    }

    //return with pSCCs
    const detailedProduct = await getDetailedProductById(req, res, product.id)
    responseHandler.created(res, {
      ...detailedProduct
    });
  } catch(error) {
    console.log("productController: create: error", error);
    responseHandler.error(res);
  }
};

const update = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, imageUrl, price, remaining, pSCCs } = req.body;

    const product = await productModel.findById(productId).select("description imageUrl price remaining id title categoryId createdAt updatedAt");
    if (!product) return responseHandler.notfound(res);

    // check for duplicates here
    const isDuplicate = await checkDuplicates(res, pSCCs)
    if(isDuplicate) {
      return responseHandler.badrequest(
        res,
        "Duplicate entries found in the pSCCs array"
      );
    }

    // check that all categories and subCategories exist in their respective tables
    const existenceError = await checkExistence(res, pSCCs)
    if(existenceError) {
      return responseHandler.badrequest(
        res,
        existenceError
      );
    }

    product.title = title;
    product.description = description;
    product.imageUrl = imageUrl;
    product.price = price;
    product.remaining = remaining;

    await product.save();

  
    // add batch to pSCC table
    //TODO: solve delete many incase error(currently old data are lost)
    await pSCCModel.deleteMany({ productId: product.id });
    try {
      await pSCCModel.insertMany(
        pSCCs.map((pSCC) => ({
          productId: product.id,
          categoryId: pSCC.categoryId,
          subCategoryId: pSCC.subCategoryId,
        }))
      );      
    } catch (error) {
      // Handle the error when inserting PSCCs
      // Rollback or perform necessary actions
    //TODO: solve delete many incase error(currently old data are lost)
      await pSCCModel.deleteMany({ productId: product.id });
      console.log("productController: update: Error while inserting pSCCs:", error);
      throw error; // Rethrow the error to be handled by the catch block below
      
    }
    
  
    //return with pSCCs
    const detailedProduct = await getDetailedProductById(req, res, product.id)
    responseHandler.ok(res, {
      ...detailedProduct
    });
  } catch(error) {
    console.log("productController: update: error", error);
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

    await pSCCModel.deleteMany({ productId });

    await product.deleteOne();

    responseHandler.ok(res);
  } catch(error) {
    console.log("productController: error", error);
    responseHandler.error(res);
  }
};

const getPSCCs = async (req, res) => {
  try {
    const pSCCs = await pSCCModel.find().sort("-createdAt");

    responseHandler.ok(res, pSCCs);
  } catch (error) {
    console.log("productController: error", error);
    responseHandler.error(res);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.aggregate([
      {
        $lookup: {
          from: "psccs",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$productId", "$$productId"],
                },
                // $or: [
                //   { subCategoryId: { $exists: false } },
                //   { subCategoryId: null },
                // ],
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $lookup: {
                from: "subcategories",
                localField: "subCategoryId",
                foreignField: "_id",
                as: "subCategory",
              },
            },
            {
              $project: {
                category: { $arrayElemAt: ["$category", 0] },
                subCategory: { $arrayElemAt: ["$subCategory", 0] },
              },
            },
            {
              $project: {
                _id: 0,
                id: "$_id",
                category: {
                  id: "$category._id",
                  name: "$category.name",
                  createdAt: "$category.createdAt",
                  updatedAt: "$category.updatedAt",
                },
                subCategory: {
                  id: "$subCategory._id",
                  name: "$subCategory.name",
                  createdAt: "$subCategory.createdAt",
                  updatedAt: "$subCategory.updatedAt",
                },
              },
            },
          ],
          as: "pSCC",
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort by createdAt field in descending order
        },
      },
      {
        $project: {
          id: "$_id",
          title: 1,
          description: 1,
          imageUrl: 1,
          price: 1,
          remaining: 1,
          createdAt: 1,
          updatedAt: 1,
          pSCCs: "$pSCC",
        },
      },
    ]);

    responseHandler.ok(res, products);
  } catch (error) {
    console.log("productController: getProducts: error", error);
    responseHandler.error(res);
  }
};

const getDetailedProductById = async (req, res, productId) => {
  try {
    const product = await productModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId)
        }
      },
      {
        $lookup: {
          from: "psccs",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$productId", "$$productId"],
                },
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $lookup: {
                from: "subcategories",
                localField: "subCategoryId",
                foreignField: "_id",
                as: "subCategory",
              },
            },
            {
              $project: {
                category: { $arrayElemAt: ["$category", 0] },
                subCategory: { $arrayElemAt: ["$subCategory", 0] },
              },
            },
            {
              $project: {
                _id: 0,
                id: "$_id",
                category: {
                  id: "$category._id",
                  name: "$category.name",
                  createdAt: "$category.createdAt",
                  updatedAt: "$category.updatedAt",
                },
                subCategory: {
                  id: "$subCategory._id",
                  name: "$subCategory.name",
                  createdAt: "$subCategory.createdAt",
                  updatedAt: "$subCategory.updatedAt",
                },
              },
            },
          ],
          as: "pSCC",
        },
      },
      {
        $project: {
          id: "$_id",
          title: 1,
          description: 1,
          imageUrl: 1,
          price: 1,
          remaining: 1,
          createdAt: 1,
          updatedAt: 1,
          pSCCs: "$pSCC",
        },
      },
    ]);

    return product[0];
  } catch (error) {
    console.log("productController: getDetailedProductById: error", error);
    responseHandler.error(res);
  }
};

export default { create, update, remove, getProducts };