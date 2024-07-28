import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";

export class CreateProfileDto
{
    public id: string;
    public userId: string;

    @ApiProperty()
    public name: string;

    public constructor(
        userId: string,
        givenName: string,
    )
    {
        this.id = uuidv4();
        this.userId = userId;
        this.name = givenName;
    }
}
