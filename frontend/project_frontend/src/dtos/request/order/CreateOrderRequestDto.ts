import z from "zod";

export const CreateOrderRequestDto = z
  .object({
    firstName: z.string(),
    LastName: z.string(),
    phoneNumber: z.string(),
    postCode: z.number(),
    cityName: z.string(),
    streetName: z.string(),
    houseNumber: z.number(),
    paymentMethod: z.string(),
    cardNumber: z.string().nullable(),
    expiryDate: z.string().nullable(),
    cvc: z.string().nullable(),
  })
  .strict();

export type CreateOrderRequestDto = z.infer<typeof CreateOrderRequestDto>;
