import z from "zod";

export const LoginResponseDto = z
  .object({
    token: z.string(),
  })
  .strict();

export type LoginResponseDto = z.infer<typeof LoginResponseDto>;
