import { payment_method as PaymentMethod } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { CreateOrderBody } from "../validation/create-order.schema";

export class CreateOrderDto
{
    public id: string;
    public customerId: string;
    public productId: string;
    public shippingAddress: string;
    public amount: number;
    public paymentMethod: PaymentMethod;

    public constructor({ paymentMethod, shippingAddress, productId, amount }: CreateOrderBody, customerId: string)
    {
        this.id = uuidv4();
        this.customerId = customerId;
        this.productId = productId;
        this.shippingAddress = shippingAddress;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }
}
