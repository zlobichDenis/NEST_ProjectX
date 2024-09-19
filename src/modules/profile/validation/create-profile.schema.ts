import { z } from "zod";

export const createProfileSchema = z.object({ displayName: z.string().max(255) });
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

