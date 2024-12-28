import { payment_method as PaymentMethod, payment_status as PaymentStatus } from "@prisma/client";
import { OrderEntity } from "../entities/order.entity";
import { AddressEntity } from "../../address/entities/address.entity";

export class CreateOrderResponse
{
    public readonly customerId: string;
    public readonly createdAt: Date;
    public readonly shippingAddress: AddressEntity;
    public readonly paymentStatus: PaymentStatus;
    public readonly paymentMethod: PaymentMethod;
    public readonly id: string;
    public readonly totalPrice: number;
    public readonly updatedAt?: Date;

    public constructor({
        id,
        createdAt,
        customerId,
        shippingAddress,
        paymentStatus,
        paymentMethod,
        updatedAt,
        totalPrice,
    }: OrderEntity)
    {
        this.id = id;
        this.createdAt = createdAt;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.paymentStatus = paymentStatus;
        this.customerId = customerId;
        this.updatedAt = updatedAt;
        this.totalPrice = totalPrice;
    }
}
