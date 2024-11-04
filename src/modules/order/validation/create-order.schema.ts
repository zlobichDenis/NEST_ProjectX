import { z } from "zod";
import { payment_method as PaymentMethod } from "@prisma/client";

export const createOrderSchema = z.object({
    productId: z.string().uuid(),
    shippingAddress: z.string(),
    amount: z.number(),
    paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH_ON_DELIVERY),
});
export type CreateOrderBody = z.infer<typeof createOrderSchema>;

