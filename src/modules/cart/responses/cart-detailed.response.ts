import { CartResponse } from "./cart.response";
import { ApiProperty } from "@nestjs/swagger";
import { CartItemResponse } from "./cart-item.response";
import { CartItemProductEntity } from "../entities/cart-item-product.entity";
import { CartItemDetailedResponse } from "./cart-item-detailed.response";

export class CartDetailedResponse extends CartResponse
{
    @ApiProperty()
    public readonly items: CartItemResponse[];

    public constructor(customerId: string, items: CartItemProductEntity[])
    {
        super(customerId, items);
        this.items = items.map((item) => new CartItemDetailedResponse(item));
    }
}
