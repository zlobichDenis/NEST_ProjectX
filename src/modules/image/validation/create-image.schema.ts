import { z } from "zod";

export const createImageSchema = z.object({ fileId: z.string() });
export type CreateImageBody = z.infer<typeof createImageSchema>;

