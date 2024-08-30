import { video as VideoBaseEntity } from "@prisma/client";
import { PublicFileEntity } from "../../public-file/entities/public-file.entity";

export class VideoEntity
{
    public id: string;
    public likesCount: number;
    public name: string;
    public fileId: string;
    public createdAt: Date;

    public file?: PublicFileEntity;

    public constructor({ id, likes_count, created_at, file_id, name }: VideoBaseEntity)
    {
        this.id = id;
        this.fileId = file_id;
        this.name = name;
        this.likesCount = likes_count;
        this.createdAt = new Date(created_at);
    }

    public setFile(file: PublicFileEntity): VideoEntity
    {
        this.file = file;

        return this;
    }
}
