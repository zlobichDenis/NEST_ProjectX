import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { ProductResponse } from "./responses/product.response";

@Injectable()
export class ProductService
{
    public constructor(private readonly productRepository: ProductRepository) {}

    public async getProductById(productId: string): Promise<ProductResponse>
    {
        const productEntity = await this.productRepository.getProductById(productId);

        if (!productEntity)
        {
            throw new NotFoundException("Product not found");
        }

        return new ProductResponse(productEntity);
    }
}
