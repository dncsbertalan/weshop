import { Category } from "@/models/Category";

export type CartItemDto = {
    id: number;
    quantity: number;
    productId: number;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    categories: Category[];
}