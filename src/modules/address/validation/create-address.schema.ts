import { z } from "zod";

export const createAddressSchema = z.object({
    country: z.string().max(255),
    city: z.string().max(255),
    postIndex: z.string().max(255),
    street: z.string().max(255),
    houseNumber: z.number().int(),
    apartment: z.number().int().optional(),
});
export type CreateAddressBody = z.infer<typeof createAddressSchema>;

