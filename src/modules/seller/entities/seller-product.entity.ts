import { seller_product as SellerProductBaseEntity } from "@prisma/client";

export class SellerProductEntity
{
    public productId: string;
    public sellerId: string;
    public createdAt: Date;

    public constructor({ product_id, seller_id, created_at }: SellerProductBaseEntity)
    {
        this.productId = product_id;
        this.sellerId = seller_id;
        this.createdAt = new Date(created_at);
    }
}
