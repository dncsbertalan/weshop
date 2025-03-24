import { Product } from "./Product";

export type PagedProducts = {
    items: Product[];
    totalItems: number;
    totalPages: number;
    currentsPages: number;
}