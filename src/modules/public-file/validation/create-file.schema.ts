import { z } from "zod";

export const createFileSchema = z.object({
    key: z.string(),
    url: z.string(),
});
export type CreateFileBody = z.infer<typeof createFileSchema>;

