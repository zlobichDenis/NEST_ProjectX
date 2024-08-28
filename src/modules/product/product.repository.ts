import { Injectable } from "@nestjs/common";
import { moderation_status as ModerationStatus } from "@prisma/client";
import { PrismaService } from "../../shared/prisma-client";
import { ProductEntity } from "./entites/product.entity";
import { GetProductListQuery } from "../seller/validation/get-product-list-query.schema";
import { TagEntity } from "../tag/entites/tag.entity";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { CreateProductDto } from "./requests/create-product.dto";

@Injectable()
export class ProductRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createProduct(
        {
            id,
            name,
            status,
            description,
            price,
        }: CreateProductDto,
        transaction: PrismaTransaction = this.prismaService
    ): Promise<ProductEntity>
    {
        const product = await transaction.product.create({
            data: {
                id,
                name,
                description,
                status,
                price,
                moderation_status: ModerationStatus.IN_PROGRESS,
            },
        });

        return new ProductEntity(product);
    }

    public async getProducts(query: GetProductListQuery): Promise<ProductEntity[]>
    {
        const products = await this.prismaService.product.findMany({
            include: {
                product_photos: { include: { photo: { include: { file: true } } } },
                product_videos: { include: { video: { include: { file: true } } } },
                tags: { include: { tag: true } },
            },
            where: {
                seller_products: { some: { seller_id: query.sellerId } },
                ...query.search ? { name: { contains: query.search } } : undefined,
                ...query.status ? { status: query.status } : undefined,
                ...query.createdAt ? { createdAt: { gte: query.createdAt } } : undefined,
            },
            orderBy: { created_at: "desc" },
            skip: query.offset,
            take: query.limit,
        });

        return products.map((product) =>
        {
            const tags = product.tags.map((tag) =>
            {
                return new TagEntity(tag.tag);
            });

            const images = product.product_photos.map((photo) =>
            {
                return new PublicFileEntity(photo.photo.file);
            });

            const videos = product.product_videos.map((video) =>
            {
                return new PublicFileEntity(video.video.file);
            });

            return (
                new ProductEntity(product)
                    .setTags(tags)
                    .setImages(images)
                    .setVideos(videos)
            );
        });
    }

    public async deleteProductById(
        productId: string,
        transaction: PrismaTransaction = this.prismaService,
    ): Promise<ProductEntity>
    {
        const deletedProduct = await transaction.product.delete({ where: { id: productId } });

        return new ProductEntity(deletedProduct);
    }
}
