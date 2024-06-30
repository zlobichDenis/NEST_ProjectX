import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto
{
    @ApiProperty()
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
        id: string,
        userId: string,
        familyName: string,
        givenName: string,
        photo?: string,
        description?: string
    )
    {
        this.id = id;
        this.userId = userId;
        this.familyName = familyName;
        this.givenName = givenName;
        this.photo = photo;
        this.description = description;
    }
}