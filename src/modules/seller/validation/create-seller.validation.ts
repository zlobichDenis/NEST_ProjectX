import { z } from "zod";

export const createSellerSchema = z.object({
    fullName: z.string().max(500),
    displayName: z.string().max(2000),
    description: z.string().max(2000),
    logo: z.string(),
    contactPhoneNumber: z.string().max(2000),
});
export type CreateSellerBody = z.infer<typeof createSellerSchema>;

