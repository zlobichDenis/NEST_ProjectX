import { image as ImageBaseEntity } from "@prisma/client";
import { PublicFileEntity } from "../../public-file/entities/public-file.entity";

export class ImageEntity
{
    public id: string;
    public fileId: string;
    public createdAt: Date;

    public file?: PublicFileEntity;

    public constructor({ id, file_id, created_at }: ImageBaseEntity)
    {
        this.id = id;
        this.fileId = file_id;
        this.createdAt = new Date(created_at);
    }

    public setFile(file: PublicFileEntity)
    {
        this.file = file;

        return this;
    }
}
