import { z } from "zod";

export const createCartSchema = z.object({
    items: z.array(z.object({
        amount: z.number().int().positive(),
        productId: z.string().uuid(),
    })),
});
export type UpsertCartBody = z.infer<typeof createCartSchema>;

