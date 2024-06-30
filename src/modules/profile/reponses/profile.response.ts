import { ApiProperty } from "@nestjs/swagger";
import { ProfileEntity } from "../entities/profile.entity";
import { UserResponse } from "../../user/responses";

export class ProfileResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public givenName: string;

    @ApiProperty()
    public familyName: string;

    @ApiProperty({ type: Date })
    public createdAt: Date;

    @ApiProperty()
    public photo?: string;

    @ApiProperty({ type: Date })
    public deletedAt?: Date;

    @ApiProperty({ type: UserResponse })
    public user?: UserResponse;

    public constructor({ id, user, givenName, familyName, photo, deletedAt, createdAt }: ProfileEntity)
    {
        this.id = id;
        this.givenName = givenName;
        this.familyName = familyName;
        this.photo = photo;
        this.deletedAt = deletedAt;
        this.createdAt = createdAt;
        this.user = user;
    }
}