import { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  pictureAlternative: string;
  availableQuantity: number;
  categories: Category[];
  isDeleted: boolean;
};

export type PagedProducts = {
  items: Product[];
  totalItems: number;
  totalPages: number;
  currentsPages: number;
};
