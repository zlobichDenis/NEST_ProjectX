import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { CreateProductTagDto } from "../requests/create-product-tag.dto";
import { ProductTagEntity } from "../entites/product-tag.entity";

@Injectable()
export class ProductTagRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createProductTags(
        dtos: CreateProductTagDto[],
        transaction: PrismaTransaction = this.prismaService
    ): Promise<ProductTagEntity[]>
    {
        const data = dtos.map((dto) => ({
            product_id: dto.productId,
            tag_id: dto.tagId,
        }));

        await transaction.product_tag.createMany({ data });

        const productTags = await transaction.product_tag
            .findMany({ where: { product_id: { in: data.map((item) => item.product_id) } } });

        return productTags.map((tag) => new ProductTagEntity(tag));
    }
}
