import { z } from "zod";

export const createProfileSchema = z.object({
    family_name: z.string().max(255),
    given_name: z.string().max(255),
    photo: z.string().optional(),
    description: z.string().max(1000).optional(),
});
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

