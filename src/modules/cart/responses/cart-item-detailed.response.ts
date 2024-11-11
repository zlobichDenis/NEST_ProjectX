import { CartItemResponse } from "./cart-item.response";
import { ApiProperty } from "@nestjs/swagger";
import { ProductResponse } from "../../product/responses/product.response";
import { CartItemProductEntity } from "../entities/cart-item-product.entity";

export class CartItemDetailedResponse extends CartItemResponse
{
    @ApiProperty()
    public readonly product: ProductResponse;

    public constructor({ product, ...cartItem }: CartItemProductEntity)
    {
        super(cartItem);
        this.product = new ProductResponse(product);
    }
}
