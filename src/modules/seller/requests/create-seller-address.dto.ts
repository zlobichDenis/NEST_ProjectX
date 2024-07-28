export class CreateSellerAddressDto
{
    public sellerId: string;
    public addressId: string;

    public constructor(sellerId: string, addressId: string)
    {
        this.sellerId = sellerId;
        this.addressId = addressId;
    }
}
