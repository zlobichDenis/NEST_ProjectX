import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SellerEvent } from "./events";
import { DeleteProductPayload } from "./payloads/delete-product.payload";
import { DeleteSellerPayload } from "./payloads/delete-seller.payload";

@Injectable()
export class EventDispatcher
{
    public constructor(private readonly eventEmitter: EventEmitter2) {}

    public async sendDeleteSellerProductEvent(payload: DeleteProductPayload): Promise<boolean>
    {
        return this.eventEmitter.emit(SellerEvent.DELETE_PRODUCT, payload);
    }

    public async sendDeleteSellerProfileEvent(payload: DeleteSellerPayload): Promise<boolean>
    {
        return this.eventEmitter.emit(SellerEvent.DELETE_SELLER_PROFILE, payload);
    }
}
