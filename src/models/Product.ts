export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductBody {
  id?: string;
  title: string;
  description: string;
}

export interface IProductForm {
  id?: string;
  title: string;
  description: string;
}
