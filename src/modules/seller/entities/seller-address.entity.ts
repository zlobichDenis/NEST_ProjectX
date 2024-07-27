import { seller_address as SellerAddresssBaseEntity } from "@prisma/client";

export class SellerAddressEntity
{
    public sellerId: string;
    public addressId: string;

    public constructor({ seller_id, address_id }: SellerAddresssBaseEntity)
    {
        this.addressId = seller_id;
        this.addressId = address_id;
    }
}
