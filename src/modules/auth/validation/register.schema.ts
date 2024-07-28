import { z } from "zod";
import { provider as AuthProvider } from "@prisma/client";

export const registerSchema = z.object({
    provider: z.nativeEnum(AuthProvider),
    tokenId: z.string(),
});
export type RegisterBody = z.infer<typeof registerSchema>;

