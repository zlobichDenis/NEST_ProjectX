import { Injectable } from "@nestjs/common";
import { moderation_status as ModerationStatus } from "@prisma/client";
import { PrismaService } from "../../shared/prisma-client";
import { CreateSellerProductDto } from "./requests/create-seller-product.dto";
import { ProductEntity } from "./entites/product.entity";
import { ProductTagRepository } from "./repositories/product-tag.repository";
import { CreateProductTagDto } from "./requests/create-product-tag.dto";
import { ProductVideoRepository } from "./repositories/product-video.repository";
import { CreateProductVideoDto } from "./requests/create-product-video.dto";
import { CreateSellerProductRelationDto } from "./requests/create-seller-product-relation.dto";
import { SellerProductRepository } from "./repositories/seller-product.repository";
import { GetProductListQuery } from "./validation/get-product-list-query.schema";
import { TagEntity } from "../tag/entites/tag.entity";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";
import { ProductPhotoRepository } from "./repositories/product-photo.repository";
import { CreateProductPhotoDto } from "./requests/create-product-photo.dto";

@Injectable()
export class ProductRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly productTagRepository: ProductTagRepository,
        private readonly productVideoRepository: ProductVideoRepository,
        private readonly sellerProductRepository: SellerProductRepository,
        private readonly productPhotoRepository: ProductPhotoRepository,
    ) {}

    public async createSellerProduct(
        {
            id,
            name,
            status,
            description,
            price,
            tags,
            videoEntity,
            photos,
        }: CreateSellerProductDto,
        sellerId: string,
    ): Promise<ProductEntity>
    {
        return this.prismaService.$transaction(async (transaction) =>
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

            const createSellerProductRelationDto = new CreateSellerProductRelationDto(sellerId, product.id);
            await this.sellerProductRepository.createSellerProduct(createSellerProductRelationDto, transaction);

            const createProductTagsDtos = tags.map((tag) => new CreateProductTagDto(product.id, tag));
            await this.productTagRepository.createProductTags(createProductTagsDtos, transaction);

            const createProductPhotoDtos = photos.map((photo) => new CreateProductPhotoDto(photo.id, product.id));
            await this.productPhotoRepository.createProductPhotos(createProductPhotoDtos, transaction);

            const createProductVideoDto = new CreateProductVideoDto(videoEntity.id, product.id);
            await this.productVideoRepository.createProductVideo(
                createProductVideoDto,
                transaction
            );

            return new ProductEntity(product);
        });
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
}
