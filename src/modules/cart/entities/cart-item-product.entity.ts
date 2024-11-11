import { cart_item as CartItemBaseEntity } from "@prisma/client";
import { CartItemEntity } from "./cart-item.entity";
import { ProductEntity } from "../../product/entites/product.entity";

export class CartItemProductEntity extends CartItemEntity
{
    public readonly product: ProductEntity;

    public constructor(baseEntity: CartItemBaseEntity, product: ProductEntity)
    {
        super(baseEntity);
        this.product = product;
    }
}
