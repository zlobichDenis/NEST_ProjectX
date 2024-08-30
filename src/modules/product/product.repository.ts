import { Injectable } from "@nestjs/common";
import { moderation_status as ModerationStatus } from "@prisma/client";
import { PrismaService } from "../../shared/prisma-client";
import { ProductEntity } from "./entites/product.entity";
import { GetProductListQuery } from "../seller/validation/get-product-list-query.schema";
import { TagEntity } from "../tag/entites/tag.entity";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { CreateProductDto } from "./requests/create-product.dto";
import { CreateRegionProductDto } from "./requests/create-region-product.dto";
import { CreateProductTagDto } from "./requests/create-product-tag.dto";
import { CreateProductPhotoDto } from "./requests/create-product-photo.dto";
import { CreateProductVideoDto } from "./requests/create-product-video.dto";
import { ProductTagRepository } from "./repositories/product-tag.repository";
import { RegionProductRepository } from "./repositories/region-product.repository";
import { RegionRepository } from "../region/region.repository";
import { ProductPhotoRepository } from "./repositories/product-photo.repository";
import { ProductVideoRepository } from "./repositories/product-video.repository";
import { ImageEntity } from "../image/entities/image.entity";
import { VideoEntity } from "../video/entities/video.entity";

@Injectable()
export class ProductRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly productTagRepository: ProductTagRepository,
        private readonly regionProductRepository: RegionProductRepository,
        private readonly regionRepository: RegionRepository,
        private readonly productPhotoRepository: ProductPhotoRepository,
        private readonly productVideoRepository: ProductVideoRepository,
    )
    {
    }

    public async createProduct(
        {
            id,
            name,
            status,
            description,
            price,
            photos,
            tags,
            regionKey,
            video,
        }: CreateProductDto,
        transaction: PrismaTransaction = this.prismaService,
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

        const region = await this.regionRepository.getRegionByKey(regionKey, transaction);
        const createRegionProductDto = new CreateRegionProductDto(product.id, region.id);
        await this.regionProductRepository.createRegionProduct(createRegionProductDto, transaction);

        const createProductTagsDtos = tags.map((tag) => new CreateProductTagDto(product.id, tag));
        await this.productTagRepository.createProductTags(createProductTagsDtos, transaction);

        const createProductPhotoDtos = photos.map((photo) => new CreateProductPhotoDto(photo.id, product.id));
        await this.productPhotoRepository.createProductPhotos(createProductPhotoDtos, transaction);

        const createProductVideoDto = new CreateProductVideoDto(video.id, product.id);
        await this.productVideoRepository.createProductVideo(
            createProductVideoDto,
            transaction,
        );

        return new ProductEntity(product);
    }

    public async getProducts(query: GetProductListQuery): Promise<ProductEntity[]>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const dbQuery = {
                include: {
                    product_photos: { include: { photo: { include: { file: true } } } },
                    product_videos: { include: { video: { include: { file: true } } } },
                    tags: { include: { tag: true } },
                },
                where: {
                    seller_products: { some: { seller_id: query.sellerId } },
                    ...query.search ? { name: { contains: query.search } } : undefined,
                    ...query.status ? { status: query.status } : undefined,
                    ...query.from ? { createdAt: { gte: query.from } } : undefined,
                    ... query.from && query.to ? { createdAt: { lte: query.to } } : undefined,
                },
                orderBy: { created_at: "desc" as const },
                skip: query.offset,
                take: query.limit,
            };

            const products = await transaction.product.findMany(dbQuery);
            const total = await transaction.product.count({ where: dbQuery.where });

            return products.map((product) =>
            {
                const tags = product.tags.map((tag) =>
                {
                    return new TagEntity(tag.tag);
                });

                const images = product.product_photos.map((photo) =>
                {
                    const fileEntity = new PublicFileEntity(photo.photo.file);

                    return new ImageEntity(photo.photo).setFile(fileEntity);
                });

                const videos = product.product_videos.map((video) =>
                {
                    const fileEntity = new PublicFileEntity(video.video.file);

                    return new VideoEntity(video.video).setFile(fileEntity);
                });

                return (
                    new ProductEntity(product)
                        .setTags(tags)
                        .setImages(images)
                        .setVideos(videos)
                        .setTotal(total)
                );
            });
        });
    }

    public async deleteProductById(
        productId: string,
        transaction: PrismaTransaction = this.prismaService,
    ): Promise<ProductEntity>
    {
        const deletedProduct = await transaction.product.delete({
            include: {
                product_photos: { include: { photo: { include: { file: true } } } },
                product_videos: { include: { video: { include: { file: true } } } },
            },
            where: { id: productId },
        });

        const videos = deletedProduct.product_videos.map((productVideo) =>
        {
            const fileEntity =  new PublicFileEntity(productVideo.video.file);

            return new VideoEntity(productVideo.video).setFile(fileEntity);
        });
        const images = deletedProduct.product_photos.map((productPhoto) =>
        {
            const fileEntity =  new PublicFileEntity(productPhoto.photo.file);

            return new ImageEntity(productPhoto.photo).setFile(fileEntity);
        });

        return new ProductEntity(deletedProduct).setImages(images).setVideos(videos);
    }
}
