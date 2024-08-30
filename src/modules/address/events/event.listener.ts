import { Injectable } from "@nestjs/common";
import { AddressService } from "../address.service";
import { OnEvent } from "@nestjs/event-emitter";
import { SellerEvent } from "../../seller/events/events";
import { DeleteSellerPayload } from "../../seller/events/payloads/delete-seller.payload";
import { ProfileEvent } from "../../profile/events/events";
import { DeleteUserProfilePayload } from "../../profile/events/payloads/delete-user-profile.payload";
import { AddressEntity } from "../entities/address.entity";

@Injectable()
export class EventListener
{
    public constructor(private readonly addressService: AddressService) {}

    @OnEvent(SellerEvent.DELETE_SELLER_PROFILE)
    public async handleDeleteSeller(payload: DeleteSellerPayload): Promise<void>
    {
        this.deleteAddresses(payload.addresses);
    }

    @OnEvent(ProfileEvent.DELETE_PROFILE)
    public async handleDeleteProfile(payload: DeleteUserProfilePayload): Promise<void>
    {
        this.deleteAddresses(payload.addresses);
    }

    private async deleteAddresses(addresses: AddressEntity[])
    {
        const addressIds = addresses.map(({ id }) => id);

        this.addressService.deleteAddressBatchByIds(addressIds);
    }
}
