import { z } from "zod";

export const getFieldKeys = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  const keys = Object.keys(schema.shape) as (keyof T)[];
  return keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {} as { [K in keyof T]: K });
};
