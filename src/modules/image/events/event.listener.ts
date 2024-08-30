import { Injectable } from "@nestjs/common";
import { DeleteProductPayload } from "../../seller/events/payloads/delete-product.payload";
import { OnEvent } from "@nestjs/event-emitter";
import { SellerEvent } from "../../seller/events/events";
import { ImageService } from "../image.service";
import { DeleteSellerPayload } from "../../seller/events/payloads/delete-seller.payload";

@Injectable()
export class EventListener
{
    public constructor(private readonly imageService: ImageService) {}

    @OnEvent(SellerEvent.DELETE_PRODUCT)
    public async handleProductDelete(payload: DeleteProductPayload): Promise<void>
    {
        this.imageService.deleteImages(payload.images);
    }

    @OnEvent(SellerEvent.DELETE_SELLER_PROFILE)
    public async handleDeleteSellerProfile(payload: DeleteSellerPayload): Promise<void>
    {
        this.imageService.deleteImages([payload.logo]);
    }
}
