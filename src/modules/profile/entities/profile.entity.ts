import { profile as ProfileBaseEntity, user as UserBaseEntity } from "@prisma/client";
import { UserEntity } from "../../user/entities";

export class ProfileEntity
{
    public id: string;
    public familyName: string;
    public givenName: string;
    public createdAt: Date;
    public photo?: string;
    public deletedAt?: Date;

    public user?: UserEntity;

    public constructor({ id, family_name, given_name, created_at, deleted_at, photo }: ProfileBaseEntity)
    {
        this.id = id;
        this.familyName = family_name;
        this.givenName = given_name;
        this.createdAt = created_at ? new Date(created_at) : undefined;
        this.deletedAt = deleted_at ? new Date(deleted_at) : undefined;
        this.photo = photo;
    }

    public setUser(user?: UserBaseEntity): ProfileEntity
    {
        this.user = user ? new UserEntity(user) : undefined;

        return this;
    }
}
