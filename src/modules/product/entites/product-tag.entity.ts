import { product_tag as ProductTagBaseEntity } from "@prisma/client";

export class ProductTagEntity
{
    public productId: string;
    public tagId: string;

    public constructor({ product_id, tag_id }: ProductTagBaseEntity)
    {
        this.productId = product_id;
        this.tagId = tag_id;
    }
}
