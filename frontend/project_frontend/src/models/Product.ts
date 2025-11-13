import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  pictureAlternative: string;
  availableQuantity: number;
  categories: Category[];
  isDeleted: boolean;
}

export interface PagedProducts {
  items: Product[];
  totalItems: number;
  totalPages: number;
  currentsPages: number;
}
