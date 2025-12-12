import z from "zod";

export const UserInformatioDto = z
  .object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .strict();

export type UserInformatioDto = z.infer<typeof UserInformatioDto>;
