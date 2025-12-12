import z from "zod";

export const CategoryDto = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
  })
  .strict();

export type CategoryDto = z.infer<typeof CategoryDto>;
