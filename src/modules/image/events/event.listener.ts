import { Injectable } from "@nestjs/common";
import { DeleteProductPayload } from "../../seller/events/payloads/delete-product.payload";
import { OnEvent } from "@nestjs/event-emitter";
import { ProductEvent } from "../../seller/events/events";
import { ImageService } from "../image.service";

@Injectable()
export class EventListener
{
    public constructor(private readonly imageService: ImageService) {}

    @OnEvent(ProductEvent.DELETE_PRODUCT)
    public handleProductDelete(payload: DeleteProductPayload): void
    {
        this.imageService.deleteImages(payload.images);
    }
}
