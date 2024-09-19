import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { ProductResponse } from "./responses/product.response";

@ApiTags("product")
@Controller("product")
export class ProductController
{
    public constructor(private readonly productService: ProductService) {}

    @Get(":productId")
    public async getProductById(@Param("productId") productId: string): Promise<ProductResponse>
    {
        return this.productService.getProductById(productId);
    }
}
