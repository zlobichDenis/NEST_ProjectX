import { public_file as PublicFileBaseEntity } from "@prisma/client";

export class PublicFileEntity
{
    public id: string;
    public key: string;
    public url: string;

    public constructor({ id, key, url }: PublicFileBaseEntity)
    {
        this.id = id;
        this.key = key;
        this.url = url;
    }
}
