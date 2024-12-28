import { profile_address as ProfileAddressBaseEntity } from "@prisma/client";
import { AddressEntity } from "../../../address/entities/address.entity";

export class ProfileAddressEntity
{
    public readonly profileId: string;
    public readonly address: AddressEntity;

    public constructor({ profile_id }: ProfileAddressBaseEntity, addressEntity: AddressEntity)
    {
        this.profileId = profile_id;
        this.address = addressEntity;
    }
}
