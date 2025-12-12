import z from "zod";

export const CreateOrderRequestDto = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phoneNumber: z.string().regex(/^[0-9+\-\s]{6,20}$/, "Invalid phone number"),
    postCode: z.string().regex(/^[0-9]{3,10}$/, "Post code must be 3-10 digits"),
    cityName: z.string().min(2, "City name must be at least 2 characters"),
    streetName: z.string().min(2, "Street name must be at least 2 characters"),
    houseNumber: z.string().regex(/^[0-9A-Za-z/-]+$/, "Invalid house number"),
    paymentMethod: z.enum(["cash", "card"]),
    // Card fields only required if payment method = "card"
    cardNumber: z
      .string()
      .regex(/^[0-9]{13,19}$/, "Card number must be 13-19 digits")
      .optional(),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/, "Expiry date must be MM/YY or MM/YYYY")
      .optional(),
    cvc: z
      .string()
      .regex(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits")
      .optional(),
  })
  .strict()
  .refine(
    (data) => {
      if (data.paymentMethod !== "card") {
        return true;
      }

      return !!data.cardNumber && !!data.expiryDate && !!data.cvc;
    },
    {
      message: "Card number, expiry date, and CVC are required when paying by card",
      path: ["paymentMethod"],
    },
  );

export type CreateOrderRequestDto = z.infer<typeof CreateOrderRequestDto>;
