import { Category } from "./Category";
import { SubCategory } from "./SubCategory";

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  remaining: number;
  createdAt: string;
  updatedAt: string;
}
export interface PSCCIDS {
  categoryId: string;
  subCategoryId: string;
}
export interface PSCC {
  id: string;
  category: Category;
  subCategory: SubCategory;
}
export interface DetailedProduct extends Product{
  pSCCs: PSCC[];
}
export interface IProductBody {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  remaining: number;
  pSCCs: PSCCIDS[];
}
