import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { SellerProductEntity } from "../entities/seller-product.entity";
import { CreateSellerProductRelationDto } from "../requests/create-seller-product-relation.dto";
import { CreateSellerProductDto } from "../requests/create-seller-product.dto";
import { ProductEntity } from "../../product/entites/product.entity";
import { ProductRepository } from "../../product/product.repository";
import { CreateProductDto } from "../../product/requests/create-product.dto";

@Injectable()
export class SellerProductRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly productRepository: ProductRepository,
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
            const createProductDto = new CreateProductDto(
                name,
                description,
                status,
                price,
                tags,
                photos,
                regionKey,
                videoEntity,
            );
            const product = await this.productRepository.createProduct(createProductDto, transaction);

            const createSellerProductRelationDto = new CreateSellerProductRelationDto(sellerId, product.id);
            await transaction.seller_product.create({
                data: {
                    seller_id: createSellerProductRelationDto.sellerId,
                    product_id: createSellerProductRelationDto.productId,
                },
            });

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
