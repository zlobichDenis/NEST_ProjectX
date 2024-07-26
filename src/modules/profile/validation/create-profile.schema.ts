import { z } from "zod";

export const createProfileSchema = z.object({
    name: z.string().max(255),
    photo: z.string().optional(),
});
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

