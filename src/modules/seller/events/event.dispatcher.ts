import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductEvent } from "./events";
import { DeleteProductPayload } from "./payloads/delete-product.payload";

@Injectable()
export class EventDispatcher
{
    public constructor(private readonly eventEmitter: EventEmitter2) {}

    public async deleteProduct(payload: DeleteProductPayload): Promise<boolean>
    {
        return this.eventEmitter.emit(ProductEvent.DELETE_PRODUCT, payload);
    }
}
