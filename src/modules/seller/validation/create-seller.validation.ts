import { z } from "zod";
import { createAddressSchema } from "../../address/validation/create-address.schema";

export const createSellerSchema = z.object({
    fullName: z.string().max(500),
    displayName: z.string().max(2000),
    description: z.string().max(2000),
    contactPhoneNumber: z.string().max(2000),
    address: createAddressSchema,
});
export type CreateSellerBody = z.infer<typeof createSellerSchema>;

