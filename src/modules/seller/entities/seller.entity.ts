import { seller as SellerBaseEntity, user as UserBaseEntity } from "@prisma/client";
import { UserEntity } from "../../user/entities";
import { AddressEntity } from "../../address/entities/address.entity";
import { PublicFileEntity } from "../../public-file/entities/public-file.entity";

export class SellerEntity
{
    public id: string;
    public userId: string;
    public displayName: string;
    public fullName: string;
    public description: string;
    public contactPhoneNumber: string;
    public createdAt: Date;
    public logoFileId: string;

    public logo?: PublicFileEntity;
    public updatedAt?: Date;
    public user?: UserEntity;
    public address?: AddressEntity;

    public constructor({
        user_id,
        updated_at,
        created_at,
        contact_phone_number,
        description,
        id,
        display_name,
        full_name,
        logo_file_id,
    }: SellerBaseEntity)
    {
        this.id = id;
        this.userId = user_id;
        this.fullName = full_name;
        this.displayName = display_name;
        this.description = description;
        this.updatedAt = updated_at ? new Date(updated_at) : null;
        this.createdAt = new Date(created_at);
        this.contactPhoneNumber = contact_phone_number;
        this.logoFileId = logo_file_id;
    }

    public setUser(user: UserBaseEntity): SellerEntity
    {
        this.user = new UserEntity(user);

        return this;
    }

    public setAddress(address: AddressEntity): SellerEntity
    {
        this.address = address;

        return this;
    }

    public setLogo(logo: PublicFileEntity): SellerEntity
    {
        this.logo = logo;

        return this;
    }
}
