import z from "zod";

export const RegistrationRequestDto = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("E-mail is not valid"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter"),
  })
  .strict();

export type RegistrationRequestDto = z.infer<typeof RegistrationRequestDto>;
