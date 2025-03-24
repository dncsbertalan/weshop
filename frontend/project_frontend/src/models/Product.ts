import { Category } from "./Category";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    picture: string;
    pictureAlternative: string;
    availableQuantity: number;
    categories: Category[];
};