import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";

export class CreateProfileDto
{
    public id: string;
    public userId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public photo?: string;

    public constructor(
        userId: string,
        givenName: string,
        photo?: string,
    )
    {
        this.id = uuidv4();
        this.userId = userId;
        this.name = givenName;
        this.photo = photo;
    }
}
