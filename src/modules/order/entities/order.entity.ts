import {
    order as OrderBaseEntity,
    payment_status as PaymentStatus,
    payment_method as PaymentMethod,
} from "@prisma/client";
import { CartItemProductEntity } from "../../cart/entities/cart-item-product.entity";
import { AddressEntity } from "../../address/entities/address.entity";

export class OrderEntity
{
    public readonly customerId: string;
    public readonly groupId: string;
    public readonly createdAt: Date;
    public readonly shippingAddress: AddressEntity;
    public readonly paymentStatus: PaymentStatus;
    public readonly paymentMethod: PaymentMethod;
    public readonly id: string;
    public readonly totalPrice: number;
    public readonly updatedAt?: Date;

    public readonly cartItem: CartItemProductEntity;

    public constructor(
        {
            group_id,
            customer_id,
            created_at,
            payment_method,
            payment_status,
            id,
            shipping_address_id,
            updated_at,
        }: OrderBaseEntity,
        cartItem?: CartItemProductEntity,
        address?: AddressEntity
    )
    {
        this.id = id;
        this.groupId = group_id;
        this.createdAt = new Date(created_at);
        this.updatedAt = updated_at ? new Date(updated_at) : undefined;
        this.paymentStatus = payment_status;
        this.paymentMethod = payment_method;
        this.customerId = customer_id;
        this.shippingAddress = address;

        this.cartItem = cartItem;
    }
}

export class OrderListItem extends OrderEntity
{
    public readonly total: number;

    public constructor(
        baseEntity: OrderBaseEntity,
        cartItem: CartItemProductEntity,
        address: AddressEntity,
        total?: number,
    )
    {
        super(baseEntity, cartItem, address);
        this.total = total;
    }
}
