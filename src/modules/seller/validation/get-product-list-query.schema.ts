import { z } from "zod";
import { product_status as ProductStatus } from "@prisma/client";

export const getProductListQuerySchema = z.object({
    sellerId: z.string().uuid(),
    search: z.string().toLowerCase().max(255).optional(),
    cursor: z.string().uuid().optional(),
    limit: z.coerce.number().int().positive().optional().default(20),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
    status: z.enum([ProductStatus.AVAILABLE, ProductStatus.NOT_AVAILABLE]).optional(),
});
export type GetProductListQuery = z.infer<typeof getProductListQuerySchema>;

