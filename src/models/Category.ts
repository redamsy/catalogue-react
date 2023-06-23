export interface Category {
  id: string;
  name: string;
  isDeletable: boolean;
}

export interface ICategoryBody {
  id?: string;
  name: string;
}
