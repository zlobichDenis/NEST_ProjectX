import { v4 as uuid } from "uuid";
import { CreateVideoBody } from "../validation/create-video.schema";

export class UploadVideoDto
{
    public id: string;
    public name: string;
    public file: Express.Multer.File;

    public constructor({ name }: CreateVideoBody, videoFile: Express.Multer.File)
    {
        this.id = uuid();
        this.name = name;
        this.file = videoFile;
    }
}
