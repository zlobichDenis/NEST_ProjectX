import { cart as CartBaseEntity } from "@prisma/client";
import { CartEntity } from "./cart.entity";
import { CartItemProductEntity } from "./cart-item-product.entity";

export class CartDetailedEntity extends CartEntity
{
    public readonly items: CartItemProductEntity[];

    public constructor(baseEntity: CartBaseEntity, items: CartItemProductEntity[])
    {
        super(baseEntity, []);
        this.items = items;
    }
}
