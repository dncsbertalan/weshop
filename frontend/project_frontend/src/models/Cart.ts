import { Category } from "./category";


export interface Cart {
    cartId: number;
    ownerId: string;
    isShared: boolean;
    cartItems: CartItem[];
}

export interface CartInfo {
    cartId: number;
    ownerFirstName: string;
    ownerLastName: string;
}

export interface CartItem {
    id: number;
    quantity: number;
    productId: number;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    categories: Category[];
    addedByFirstName: string;
    addedByLastName: string;
}

