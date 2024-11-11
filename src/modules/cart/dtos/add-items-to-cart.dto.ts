import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { CartItemDto } from "./cart-item.dto";

export class AddItemsToCartDto
{
    @ApiHideProperty()
    public readonly cartId: string;

    @ApiProperty({ isArray: true, type: CartItemDto })
    public readonly items: CartItemDto[];

    public constructor(cartId: string, items: CartItemDto[])
    {
        this.cartId = cartId;
        this.items = items;
    }
}
