import { public_file as PublicFileBaseEntity } from "@prisma/client";

export class PublicFileEntity
{
    public id: string;
    public key: string;
    public url: string;
    public createdAt: Date;
    public updatedAt?: Date;

    public constructor({ id, key, url, created_at, updated_at }: PublicFileBaseEntity)
    {
        this.id = id;
        this.key = key;
        this.url = url;
        this.createdAt = new Date(created_at);
        this.updatedAt = updated_at ? new Date(updated_at) : undefined;
    }
}
