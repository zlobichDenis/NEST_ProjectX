import { z } from "zod";

export const listOffsetSchema = z.object({
    offset: z.coerce.number().int().optional().default(0),
    limit: z.coerce.number().int().optional().default(20),
});
export type ListOffsetQuery = z.infer<typeof listOffsetSchema>;

