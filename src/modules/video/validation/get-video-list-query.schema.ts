import { z } from "zod";

export const getVideoListQuerySchema = z.object({
    cursor: z.string().uuid().optional(),
    limit: z.coerce.number().int().positive().optional().default(20),
});
export type GetVideoListQuery = z.infer<typeof getVideoListQuerySchema>;

