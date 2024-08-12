import { video as VideoBaseEntity } from "@prisma/client";

export class VideoEntity
{
    public id: string;
    public likesCount: number;
    public createdAt: Date;

    public constructor({ id, likes_count, created_at }: VideoBaseEntity)
    {
        this.id = id;
        this.likesCount = likes_count;
        this.createdAt = new Date(created_at);
    }
}
