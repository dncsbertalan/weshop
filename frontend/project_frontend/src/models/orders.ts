export interface OrderItem {
    productName: string;
    price: number;
    quantity: number;
}

export interface Order {
    orderId: string;
    createdAt: Date;
    items: OrderItem[];
}

export interface Orders {
    orders: Order[];
}