export class CreateVideoDto
{
    public name: string;
    public key: string;
    public location: string;
    public id: string;

    public constructor(id: string, name: string, key: string, location: string)
    {
        this.id = id;
        this.name = name;
        this.key = key;
        this.location = location;
    }
}
