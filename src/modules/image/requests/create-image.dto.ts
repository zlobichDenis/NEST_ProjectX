import { v4 as uuid } from "uuid";
import { CreateImageBody } from "../validation/create-image.schema";

export class CreateImageDto
{
    public id: string;
    public fileId: string;

    public constructor({ fileId }: CreateImageBody)
    {
        this.id = uuid();
        this.fileId = fileId;
    }
}
