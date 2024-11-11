import { ApiProperty } from "@nestjs/swagger";
import { CartItemEntity } from "../entities/cart-item.entity";

export class CartItemResponse
{
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly cartId: string;

    @ApiProperty()
    public readonly quantity: number;

    @ApiProperty()
    public readonly addedAt: Date;


    public constructor({ id, cartId, quantity, addedAt }: CartItemEntity)
    {
        this.id = id;
        this.cartId = cartId;
        this.quantity = quantity;
        this.addedAt = addedAt;
    }
}
