import { region as RegionBaseEntity, region_key as RegionKey } from "@prisma/client";

export class RegionEntity
{
    public id: string;
    public currency: string;
    public key: RegionKey;
    public displayName: string;
    public createdAt: Date;

    public constructor({ id, currency, key, display_name, created_at }: RegionBaseEntity)
    {
        this.id = id;
        this.currency = currency;
        this.key = key;
        this.displayName = display_name;
        this.createdAt = new Date(created_at);
    }
}
