import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { ProductVideoEntity } from "../entites/product-video.entity";
import { CreateProductVideoDto } from "../requests/create-product-video.dto";

@Injectable()
export class ProductVideoRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createProductVideo(
        {
            videoId,
            productId,
        }: CreateProductVideoDto,
        transaction?: PrismaTransaction
    ): Promise<ProductVideoEntity>
    {
        const client = transaction || this.prismaService;

        const productVideo = await client.product_videos.create({
            data: {
                video_id: videoId,
                product_id: productId,
            },
        });

        return new ProductVideoEntity(productVideo);
    }
}

