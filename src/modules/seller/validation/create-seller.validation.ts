import { z } from "zod";

export const createSellerSchema = z.object({
    fullName: z.string().max(500),
    displayName: z.string().max(2000),
    description: z.string().max(2000),
    contactPhoneNumber: z.string().max(2000),
    country: z.string().max(255),
    city: z.string().max(255),
    postIndex: z.string().max(255).optional(),
    street: z.string().max(255),
    houseNumber: z.coerce.number().int().optional(),
    apartment: z.coerce.number().int().optional(),
    contactEmail: z.string().email(),
});
export type CreateSellerBody = z.infer<typeof createSellerSchema>;

