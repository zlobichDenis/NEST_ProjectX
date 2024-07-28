import { ApiProperty } from "@nestjs/swagger";
import { ProfileEntity } from "../entities/profile.entity";
import { UserResponse } from "../../user/responses";

export class ProfileResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public displayName: string;

    @ApiProperty()
    public familyName: string;

    @ApiProperty({ type: Date })
    public createdAt: Date;

    @ApiProperty()
    public photo?: string;

    @ApiProperty({ type: Date })
    public updatedAt?: Date;

    @ApiProperty({ type: UserResponse })
    public user?: UserResponse;

    public constructor({ id, user, displayName, photo, createdAt, updatedAt }: ProfileEntity)
    {
        this.id = id;
        this.displayName = displayName;
        this.photo = photo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }
}
