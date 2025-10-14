import z from "zod";

export const LoginRequestDto = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

export type LoginRequestDto = z.infer<typeof LoginRequestDto>;
