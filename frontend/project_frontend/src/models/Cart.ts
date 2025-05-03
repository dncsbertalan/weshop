import { Category } from "./category";


export type Cart = {
    //cartInfo: CartInfo;
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
};

