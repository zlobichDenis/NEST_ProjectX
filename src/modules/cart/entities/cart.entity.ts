import { cart as CartBaseEntity } from "@prisma/client";
import { CartItemEntity } from "./cart-item.entity";

export class CartEntity
{
    public readonly id: string;
    public readonly createdAt: Date;
    public readonly customerId: string;
    public readonly items: CartItemEntity[];
    public readonly updatedAt?: Date;

    public constructor({ id, customer_id, updated_at, created_at }: CartBaseEntity, items: CartItemEntity[])
    {
        this.customerId = customer_id;
        this.id = id;
        this.updatedAt = updated_at;
        this.createdAt = created_at;
        this.items = items;
    }
}
