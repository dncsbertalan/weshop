export type OrderItem = {
    productName: string;
    price: number;
    quantity: number;
};

export type Order = {
    orderId: string;
    createdAt: Date;
    items: OrderItem[];
};

export type Orders = {
    orders: Order[];
};