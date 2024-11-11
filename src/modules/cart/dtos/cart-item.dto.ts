import { ApiProperty } from "@nestjs/swagger";

export class CartItemDto
{
    public readonly id: string;

    @ApiProperty()
    public productId: string;

    @ApiProperty()
    public quantity: number;

    public constructor(id: string, productId: string, quantity: number)
    {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }
}
