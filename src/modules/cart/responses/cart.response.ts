import { ApiProperty } from "@nestjs/swagger";
import { CartItemResponse } from "./cart-item.response";
import { CartItemEntity } from "../entities/cart-item.entity";

export class CartResponse
{
    @ApiProperty()
    public readonly customerId: string;

    @ApiProperty()
    public readonly items: CartItemResponse[];

    public constructor(customerId: string, items: CartItemEntity[])
    {
        this.customerId = customerId;
        this.items = items.map((item) => new CartItemResponse(item));
    }
}

