import { z } from "zod";
import { payment_method as PaymentMethod } from "@prisma/client";
import { createAddressSchema } from "../../address/validation/create-address.schema";

export const createOrderSchema = z.object({
    items: z.string().uuid().array(),
    shippingAddress: createAddressSchema.optional(),
    existingAddressId: z.string().uuid().optional(),
    paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH_ON_DELIVERY),
});
export type CreateOrderBody = z.infer<typeof createOrderSchema>;

