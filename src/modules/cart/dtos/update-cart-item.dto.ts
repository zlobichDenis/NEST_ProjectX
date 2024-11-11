export class UpdateCartItemDto
{
    public cartItemId: string;
    public quantity: number;

    public constructor(cartItemId: string, quantity: number)
    {
        this.cartItemId = cartItemId;
        this.quantity = quantity;
    }
}
