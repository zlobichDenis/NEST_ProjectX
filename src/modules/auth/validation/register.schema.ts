import { z } from "zod";
import { provider as AuthProvider } from "@prisma/client";

export const registerSchema = z.object({
    provider: z.nativeEnum(AuthProvider),
    email: z.string().email("Invalid format"),
    originalId: z.string(),
});
export type RegisterBody = z.infer<typeof registerSchema>;

export const loginSchema = z.object({ email: z.string().email("Invalid email address") });
export type LoginParams = z.infer<typeof loginSchema>;

