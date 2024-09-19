import { Module } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { VideoModule } from "../video/video.module";
import { ProductVideoRepository } from "./repositories/product-video.repository";
import { ProductTagRepository } from "./repositories/product-tag.repository";
import { ProductPhotoRepository } from "./repositories/product-photo.repository";
import { ImageModule } from "../image/image.module";
import { RegionProductRepository } from "./repositories/region-product.repository";
import { RegionModule } from "../region/region.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [
        VideoModule,
        ImageModule,
        RegionModule,
    ],
    controllers: [
        ProductController,
    ],
    providers: [
        ProductService,
        ProductRepository,
        ProductVideoRepository,
        ProductTagRepository,
        ProductPhotoRepository,
        RegionProductRepository,
    ],
    exports: [
        ProductRepository,
    ],
})
export class ProductModule {}
