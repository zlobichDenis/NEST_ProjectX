import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService
{
    public constructor(private readonly productRepository: ProductRepository) {}
}
