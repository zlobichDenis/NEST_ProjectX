import { z } from "zod";

export const getProfileAdressesListSchema = z.object({
    cursor: z.string().uuid().optional(),
    limit: z.coerce.number().int().positive().optional().default(20),
});
export type GetProfileAdressesListQuery = z.infer<typeof getProfileAdressesListSchema>;
