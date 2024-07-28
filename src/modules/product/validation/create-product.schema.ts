import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string().max(255),

});
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

