export interface CheckoutInfoData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    postCode: number;
    cityName: string;
    streetName: string;
    houseNumber: number;
    paymentMethod: string;
    cardNumber?: string;
    expiryDate?: string;
    cvc?: string;
}