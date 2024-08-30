import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ProductEvent } from "../../seller/events/events";
import { DeleteProductPayload } from "../../seller/events/payloads/delete-product.payload";
import { VideoService } from "../video.service";

@Injectable()
export class EventListener
{
    public constructor(private readonly videoService: VideoService) {}

    @OnEvent(ProductEvent.DELETE_PRODUCT)
    public handleDeleteProduct(payload: DeleteProductPayload): void
    {
        this.videoService.deleteVideos(payload.videos);
    }
}
