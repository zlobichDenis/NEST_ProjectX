import { CartItemDto } from "./cart-item.dto";

export class CreateCartItemDto extends CartItemDto
{
    public readonly cartId: string;

    public constructor(id: string, cartId: string, productId: string, quantity: number)
    {
        super(id, productId, quantity);
        this.cartId = cartId;
    }
}
