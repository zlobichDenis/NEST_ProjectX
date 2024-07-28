import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        ProductService,
        ProductRepository,
    ],
    exports: [],
})
export class ProductModule {}
