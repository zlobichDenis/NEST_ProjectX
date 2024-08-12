import { tag as TagBaseEntity } from "@prisma/client";

export class TagEntity
{
    public id: string;
    public name: string;
    public createdAt: Date;
    public updatedAt?: Date;

    public constructor({ id, name, updated_at, created_at }: TagBaseEntity)
    {
        this.id = id;
        this.name = name;
        this.updatedAt = updated_at ? new Date(updated_at) : undefined;
        this.createdAt = new Date(created_at);
    }
}
