import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";

export class CreateProfileDto
{
    public id: string;

    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public familyName: string;

    @ApiProperty()
    public givenName: string;

    @ApiProperty()
    public photo?: string;

    @ApiProperty()
    public description?: string;

    public constructor(
        userId: string,
        familyName: string,
        givenName: string,
        photo?: string,
        description?: string
    )
    {
        this.id = uuidv4();
        this.userId = userId;
        this.familyName = familyName;
        this.givenName = givenName;
        this.photo = photo;
        this.description = description;
    }
}
