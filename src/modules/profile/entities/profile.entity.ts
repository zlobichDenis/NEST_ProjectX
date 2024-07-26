import { profile as ProfileBaseEntity, user as UserBaseEntity } from "@prisma/client";
import { UserEntity } from "../../user/entities";

export class ProfileEntity
{
    public id: string;
    public displayName: string;
    public createdAt: Date;
    public photo?: string;
    public updatedAt?: Date;

    public user?: UserEntity;

    public constructor({ id, display_name, created_at, updated_at, photo }: ProfileBaseEntity)
    {
        this.id = id;
        this.displayName = display_name;
        this.createdAt = created_at ? new Date(created_at) : undefined;
        this.updatedAt = updated_at ? new Date(updated_at) : undefined;
        this.photo = photo;
    }

    public setUser(user?: UserBaseEntity): ProfileEntity
    {
        this.user = user ? new UserEntity(user) : undefined;

        return this;
    }
}
