import { z } from "zod";

export const createProfileSchema = z.object({
    userId: z.string().uuid(),
    familyName: z.string().max(255),
    givenName: z.string().max(255),
    photo: z.string(),
    description: z.string().max(1000),
});
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

