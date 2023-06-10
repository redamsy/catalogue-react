import { AxiosResponse } from "axios";
import otherAxios from "../interceptors/otherAxios";
import { IProductBody, Product } from "../models/Product";

export const getCurrentUserProducts = async (): Promise<AxiosResponse<Product[]>> => {
  const resp = await otherAxios.get<Product[]>("/product");

  return resp;
};

export const createProduct = async (
  product: IProductBody
): Promise<AxiosResponse<Product>> => {
  const resp = await otherAxios.post<Product>("/product", product);
  return resp;
};

export const updateCurrentUserProduct = async (
  product: IProductBody
): Promise<AxiosResponse<Product>> => {
  const resp = await otherAxios.put<Product>(`/product/${product.id}`, product);
  return resp;
};

export const deleteCurrentUserProduct = async (
  productId: string
): Promise<AxiosResponse<Product>> => {
  const resp = await otherAxios.delete(`/product/${productId}`);

  return resp;
};
