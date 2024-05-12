import { z } from "zod";
import { provider as AuthProvider } from "@prisma/client";

export const loginSchema = z.object({ provider: z.nativeEnum(AuthProvider) });

export type LoginQuery = z.infer<typeof loginSchema>;
