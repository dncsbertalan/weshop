import { Category } from "./category";


export type Cart = {
    cartId: number;
    ownerId: string;
    isShared: boolean;
    cartItems: CartItem[];
};

export type CartInfo = {
    cartId: number;
    ownerFirstName: string;
    ownerLastName: string;
};

export type CartItem = {
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
};

