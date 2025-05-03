import { CartInfo } from "./cart";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    cartId: number;
    carts: CartInfo[];
}