import { seller as SellerBaseEntity, user as UserBaseEntity } from "@prisma/client";
import { UserEntity } from "../../user/entities";

export class SellerEntity
{
    public id: string;
    public userId: string;
    public displayName: string;
    public fullName: string;
    public description: string;
    public logo: string;
    public contactPhoneNumber: string;
    public createdAt: Date;
    public updatedAt?: Date;
    public user?: UserEntity;

    public constructor({
        user_id,
        updated_at,
        created_at,
        contact_phone_number,
        description,
        id,
        display_name,
        full_name,
        logo,
    }: SellerBaseEntity)
    {
        this.id = id;
        this.userId = user_id;
        this.logo = logo;
        this.fullName = full_name;
        this.displayName = display_name;
        this.description = description;
        this.updatedAt = updated_at ? new Date(updated_at) : null;
        this.createdAt = new Date(created_at);
        this.contactPhoneNumber = contact_phone_number;
    }

    public setUser(user: UserBaseEntity)
    {
        this.user = new UserEntity(user);

        return this;
    }
}
