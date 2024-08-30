import { z } from "zod";
import { provider as AuthProvider, user_role as UserRole } from "@prisma/client";

export const registerSchema = z.object({
    provider: z.nativeEnum(AuthProvider),
    tokenId: z.string(),
    role: z.nativeEnum(UserRole),
});
export type RegisterBody = z.infer<typeof registerSchema>;

