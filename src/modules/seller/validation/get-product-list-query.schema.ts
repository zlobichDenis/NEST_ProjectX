import { z } from "zod";
import { product_status as ProductStatus } from "@prisma/client";

export const getProductListQuerySchema = z.object({
    sellerId: z.string().uuid(),
    search: z.string().toLowerCase().max(255).optional(),
    limit: z.coerce.number().int().positive().optional().default(20),
    offset: z.coerce.number().int().optional().default(0),
    from: z.string().date().optional(),
    to: z.string().date().optional(),
    status: z.enum([ProductStatus.AVAILABLE, ProductStatus.NOT_AVAILABLE]).optional(),
});
export type GetProductListQuery = z.infer<typeof getProductListQuerySchema>;

