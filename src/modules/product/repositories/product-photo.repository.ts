import { Injectable } from "@nestjs/common";
import { CreateProductPhotoDto } from "../requests/create-product-photo.dto";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { PrismaService } from "../../../shared/prisma-client";
import { ProductPhotoEntity } from "../entites/product-photo.entity";

@Injectable()
export class ProductPhotoRepository
{
    public constructor(private readonly prismaService: PrismaService,) {}

    public async createProductPhotos(
        dtos: CreateProductPhotoDto[],
        transaction: PrismaTransaction = this.prismaService
    ): Promise<ProductPhotoEntity[]>
    {
        await transaction.product_photo.createMany({
            data: dtos.map(({ photoId, productId }) => ({
                photo_id: photoId,
                product_id: productId,
            })),
        });

        const createdProductPhotos = await transaction
            .product_photo
            .findMany({ where: { product_id: { in: dtos.map(({ productId }) => productId) } } });

        return createdProductPhotos.map((photo) => new ProductPhotoEntity(photo));
    }
}
