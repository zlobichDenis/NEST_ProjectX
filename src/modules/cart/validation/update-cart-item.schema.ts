import { z } from "zod";

export const updateCartItemSchema = z.object({ amount: z.number().int().positive() });
export type UpdateCartItemBody = z.infer<typeof updateCartItemSchema>;

