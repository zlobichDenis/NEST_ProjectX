import { product_photo as ProductPhotoBaseEntity } from "@prisma/client";

export class ProductPhotoEntity
{
    public photoId: string;
    public productId: string;
    public createdAt: Date;

    public constructor({ photo_id, product_id, created_at }: ProductPhotoBaseEntity)
    {
        this.photoId = photo_id;
        this.productId = product_id;
        this.createdAt = new Date(created_at);
    }
}
