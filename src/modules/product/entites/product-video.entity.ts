import { product_videos as ProductBaseVideo } from "@prisma/client";

export class ProductVideoEntity
{
    public videoId: string;
    public productId: string;
    public createdAt: Date;

    public constructor({ video_id, product_id, created_at }: ProductBaseVideo)
    {
        this.videoId = video_id;
        this.productId  = product_id;
        this.createdAt = new Date(created_at);
    }
}
