import { v4 as uuid } from 'uuid';
import { CreateFileBody } from "../validation/create-file.schema";

export class CreateFileDto
{
    public id: string;
    public url: string;
    public key: string;

    public constructor({ url, key }: CreateFileBody)
    {
        this.id = uuid();
        this.url = url;
        this.key = key;
    }
}
