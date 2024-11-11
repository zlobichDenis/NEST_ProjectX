import { cart_item as CartItemBaseEntity } from "@prisma/client";

export class CartItemEntity
{
    public readonly id: string;
    public readonly productId: string;
    public readonly cartId: string;
    public readonly quantity: number;
    public readonly addedAt: Date;

    public constructor({ id, product_id, cart_id, quantity, added_at }: CartItemBaseEntity)
    {
        this.id = id;
        this.productId = product_id;
        this.cartId = cart_id;
        this.quantity = quantity;
        this.addedAt = new Date(added_at);
    }
}
