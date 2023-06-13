export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductBody {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}
