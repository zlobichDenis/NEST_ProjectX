import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { SellerProductEntity } from "../entites/seller-product.entity";
import { CreateSellerProductRelationDto } from "../requests/create-seller-product-relation.dto";

@Injectable()
export class SellerProductRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createSellerProduct(
        dto: CreateSellerProductRelationDto,
        transaction: PrismaTransaction = this.prismaService,
    ): Promise<SellerProductEntity>
    {
        const sellerProduct = await transaction.seller_product.create({
            data: {
                product_id: dto.productId,
                seller_id: dto.sellerId,
            },
        });

        return new SellerProductEntity(sellerProduct);
    }
}
