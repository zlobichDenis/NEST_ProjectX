import { v4 as uuid } from "uuid";

export class UploadImageDto
{
    public id: string;
    public file: Express.Multer.File;

    public constructor(file: Express.Multer.File)
    {
        this.id = uuid();
        this.file = file;
    }
}
