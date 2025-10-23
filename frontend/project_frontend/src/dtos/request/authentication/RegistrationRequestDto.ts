import z from "zod";

export const RegistrationRequestDto = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    birtDate: z.string(),
    password: z.string(),
  })
  .strict();

export type RegistrationRequestDto = z.infer<typeof RegistrationRequestDto>;
