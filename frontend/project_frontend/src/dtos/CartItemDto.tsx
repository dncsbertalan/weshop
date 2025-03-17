import { Category } from "@/models/Category";

export type CartItemDto = {
    id: number;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    categories: Category[];
    quantity: number;
}