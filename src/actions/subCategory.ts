import { AxiosResponse } from "axios";
import otherAxios from "../interceptors/otherAxios";
import { ISubCategoryBody, SubCategory } from "../models/SubCategory";

export const getSubCategories = async (): Promise<AxiosResponse<SubCategory[]>> => {
  const resp = await otherAxios.get<SubCategory[]>("/api/subCategories");

  return resp;
};

export const createSubCategory = async (
  subCategory: ISubCategoryBody
): Promise<AxiosResponse<SubCategory>> => {
  const resp = await otherAxios.post<SubCategory>("/api/subCategories", subCategory);
  return resp;
};

export const updateSubCategory = async (
  subCategory: ISubCategoryBody
): Promise<AxiosResponse<SubCategory>> => {
  const resp = await otherAxios.put<SubCategory>(`/api/subCategories/${subCategory.id}`, subCategory);
  return resp;
};

export const deleteSubCategory = async (
  subCategoryId: string
): Promise<AxiosResponse<void>> => {
  const resp = await otherAxios.delete(`/api/subCategories/${subCategoryId}`);

  return resp;
};
