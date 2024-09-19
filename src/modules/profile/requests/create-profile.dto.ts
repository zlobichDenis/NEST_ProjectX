import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";

export class CreateProfileDto
{
    public id: string;
    public userId: string;
    public avatarImageId: string;

    @ApiProperty()
    public displayName: string;

    public constructor(
        userId: string,
        displayName: string,
    )
    {
        this.id = uuidv4();
        this.userId = userId;
        this.displayName = displayName;
    }

    public setAvatarImageId(imageId: string): CreateProfileDto
    {
        this.avatarImageId = imageId;

        return this;
    }
}
