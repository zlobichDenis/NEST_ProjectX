import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { CreateRegionProductDto } from "../requests/create-region-product.dto";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { RegionProductEntity } from "../entites/region-product.entity";

@Injectable()
export class RegionProductRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createRegionProduct(
        dto: CreateRegionProductDto,
        transaction: PrismaTransaction = this.prismaService
    ): Promise<RegionProductEntity>
    {
        const regionProduct = await transaction.region_product.create({
            data: {
                region_id: dto.regionId,
                product_id: dto.productId,
            },
        });

        return new RegionProductEntity(regionProduct);
    }
}
