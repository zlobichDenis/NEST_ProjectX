import { z } from "zod";
import { product_status as ProductStatus } from "@prisma/client";

export const createProductSchema = z.object({
    name: z.string().max(255),
    description: z.string().max(255).optional(),
    price: z.coerce.number().positive(),
    status: z.enum([ProductStatus.AVAILABLE, ProductStatus.NOT_AVAILABLE]),
    tags: z.preprocess((rel) =>
    {
        return (rel as string).split(",").map((tag) => tag.trim());
    }, z.array(z.string().uuid())),
});
export type CreateProductBody = z.infer<typeof createProductSchema>;

