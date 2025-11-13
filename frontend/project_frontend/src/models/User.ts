import { CartInfo } from "./cart";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    cartId: number;
    carts: CartInfo[];
}