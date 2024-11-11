import { z } from "zod";

export const addItemToCartSchema = z.object({
    amount: z.number().int().positive(),
    productId: z.string().uuid(),
});
export type AddItemToCartBody = z.infer<typeof addItemToCartSchema>;

