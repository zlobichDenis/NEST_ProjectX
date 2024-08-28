import { region_product as RegionProductBaseEntity } from "@prisma/client";

export class RegionProductEntity
{
    public productId: string;
    public regionId: string;

    public constructor({ product_id, region_id }: RegionProductBaseEntity)
    {
        this.productId = product_id;
        this.regionId = region_id;
    }
}
