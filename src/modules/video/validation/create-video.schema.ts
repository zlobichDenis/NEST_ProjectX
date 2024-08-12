import { z } from "zod";

export const createVideoSchema = z.object({ name: z.string().max(510) });
export type CreateVideoBody = z.infer<typeof createVideoSchema>;
