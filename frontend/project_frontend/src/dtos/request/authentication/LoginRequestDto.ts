import z from "zod";

export const LoginRequestDto = z
  .object({
    email: z.email("E-mail is not valid"),
    password: z.string().min(1, "Password is requiered").min(8, "Password is too short"),
  })
  .strict();

export type LoginRequestDto = z.infer<typeof LoginRequestDto>;
