import { profile as ProfileBaseEntity } from "@prisma/client";
import { UserEntity } from "../../user/entities";
import { AddressEntity } from "../../address/entities/address.entity";
import { ImageEntity } from "../../image/entities/image.entity";

export class ProfileEntity
{
    public id: string;
    public displayName: string;
    public createdAt: Date;
    public photo?: ImageEntity;
    public updatedAt?: Date;

    public user?: UserEntity;
    public addresses?: AddressEntity[];

    public constructor({ id, display_name, created_at, updated_at }: ProfileBaseEntity)
    {
        this.id = id;
        this.displayName = display_name;
        this.createdAt = created_at ? new Date(created_at) : undefined;
        this.updatedAt = updated_at ? new Date(updated_at) : undefined;
    }

    public setUser(user: UserEntity): ProfileEntity
    {
        this.user = user;

        return this;
    }

    public setAddresses(addresses: AddressEntity[]): ProfileEntity
    {
        this.addresses = addresses;

        return this;
    }

    public setPhoto(image: ImageEntity): ProfileEntity
    {
        this.photo = image;

        return this;
    }
}
