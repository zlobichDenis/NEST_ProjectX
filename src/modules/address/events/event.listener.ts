import { Injectable } from "@nestjs/common";
import { AddressService } from "../address.service";
import { OnEvent } from "@nestjs/event-emitter";
import { SellerEvent } from "../../seller/events/events";
import { DeleteSellerPayload } from "../../seller/events/payloads/delete-seller.payload";

@Injectable()
export class EventListener
{
    public constructor(private readonly addressService: AddressService) {}

    @OnEvent(SellerEvent.DELETE_SELLER_PROFILE)
    public async handleDeleteSeller(payload: DeleteSellerPayload): Promise<void>
    {
        const addressIds = payload.addresses.map(({ id }) => id);

        this.addressService.deleteAddressBatchByIds(addressIds);
    }
}
