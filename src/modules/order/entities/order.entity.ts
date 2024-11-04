import {
    order as OrderBaseEntity,
    payment_status as PaymentStatus,
    payment_method as PaymentMethod,
} from "@prisma/client";

export class OrderEntity
{
    public readonly customerId: string;
    public readonly createdAt: Date;
    public readonly productId: string;
    public readonly amount: number;
    public readonly shippingAddress: string;
    public readonly paymentStatus: PaymentStatus;
    public readonly paymentMethod: PaymentMethod;
    public readonly id: string;
    public readonly updatedAt?: Date;

    public constructor({
        customer_id,
        created_at,
        payment_method,
        payment_status,
        product_id,
        amount,
        id,
        shipping_address,
        updated_at,
    }: OrderBaseEntity)
    {
        this.id = id;
        this.createdAt = new Date(created_at);
        this.updatedAt = updated_at ? new Date(updated_at) : undefined;
        this.paymentStatus = payment_status;
        this.paymentMethod = payment_method;
        this.productId = product_id;
        this.customerId = customer_id;
        this.amount = amount;
        this.shippingAddress = shipping_address;
    }
}

export class OrderListItem extends OrderEntity
{
    public readonly total: number;

    public constructor(baseEntity: OrderBaseEntity, total: number)
    {
        super(baseEntity);

        this.total = total;
    }
}
