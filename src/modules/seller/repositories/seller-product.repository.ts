import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { SellerProductEntity } from "../entities/seller-product.entity";
import { CreateSellerProductRelationDto } from "../requests/create-seller-product-relation.dto";
import { CreateSellerProductDto } from "../requests/create-seller-product.dto";
import { ProductEntity } from "../../product/entites/product.entity";
import { CreateProductTagDto } from "../../product/requests/create-product-tag.dto";
import { CreateProductPhotoDto } from "../../product/requests/create-product-photo.dto";
import { CreateProductVideoDto } from "../../product/requests/create-product-video.dto";
import { ProductTagRepository } from "../../product/repositories/product-tag.repository";
import { ProductVideoRepository } from "../../product/repositories/product-video.repository";
import { ProductPhotoRepository } from "../../product/repositories/product-photo.repository";
import { ProductRepository } from "../../product/product.repository";
import { CreateProductDto } from "../../product/requests/create-product.dto";
import { RegionProductRepository } from "../../product/repositories/region-product.repository";
import { RegionRepository } from "../../region/region.repository";
import { CreateRegionProductDto } from "../../product/requests/create-region-product.dto";

@Injectable()
export class SellerProductRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        // TODO: make all operations within create transaction into product repository
        private readonly productTagRepository: ProductTagRepository,
        private readonly productVideoRepository: ProductVideoRepository,
        private readonly productPhotoRepository: ProductPhotoRepository,
        private readonly productRepository: ProductRepository,
        private readonly regionProductRepository: RegionProductRepository,
        private readonly regionRepository: RegionRepository,
    ) {}

    public async createSellerProduct(
        {
            name,
            status,
            description,
            price,
            tags,
            videoEntity,
            photos,
            regionKey,
        }: CreateSellerProductDto,
        sellerId: string,
    ): Promise<ProductEntity>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const createProductDto = new CreateProductDto(name, description, status, price);
            const product = await this.productRepository.createProduct(createProductDto, transaction);

            const createSellerProductRelationDto = new CreateSellerProductRelationDto(sellerId, product.id);
            await transaction.seller_product.create({
                data: {
                    seller_id: createSellerProductRelationDto.sellerId,
                    product_id: createSellerProductRelationDto.productId,
                },
            });

            const region = await this.regionRepository.getRegionByKey(regionKey, transaction);
            const createRegionProductDto = new CreateRegionProductDto(product.id, region.id);
            await this.regionProductRepository.createRegionProduct(createRegionProductDto, transaction);

            const createProductTagsDtos = tags.map((tag) => new CreateProductTagDto(product.id, tag));
            await this.productTagRepository.createProductTags(createProductTagsDtos, transaction);

            const createProductPhotoDtos = photos.map((photo) => new CreateProductPhotoDto(photo.id, product.id));
            await this.productPhotoRepository.createProductPhotos(createProductPhotoDtos, transaction);

            const createProductVideoDto = new CreateProductVideoDto(videoEntity.id, product.id);
            await this.productVideoRepository.createProductVideo(
                createProductVideoDto,
                transaction
            );

            return product;
        });
    }

    public async getSellerProductByProductId(
        productId: string,
        transaction: PrismaTransaction = this.prismaService,
    ): Promise<SellerProductEntity>
    {
        const sellerProduct = await transaction.seller_product.findFirst({ where: { product_id: productId } });

        return new SellerProductEntity(sellerProduct);
    }
}
