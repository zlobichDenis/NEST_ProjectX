import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductRepository } from "./product.repository";
import { ProductController } from "./product.controller";
import { VideoModule } from "../video/video.module";
import { ProductVideoRepository } from "./repositories/product-video.repository";
import { ProductTagRepository } from "./repositories/product-tag.repository";
import { SellerProductRepository } from "./repositories/seller-product.repository";
import { SellerModule } from "../seller/seller.module";
import { ProductPhotoRepository } from "./repositories/product-photo.repository";
import { ImageModule } from "../image/image.module";

@Module({
    imports: [
        VideoModule,
        SellerModule,
        ImageModule,
    ],
    controllers: [ProductController],
    providers: [
        ProductService,
        ProductRepository,
        ProductVideoRepository,
        ProductTagRepository,
        SellerProductRepository,
        ProductPhotoRepository,
    ],
    exports: [],
})
export class ProductModule {}
