import { Module } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { VideoModule } from "../video/video.module";
import { ProductVideoRepository } from "./repositories/product-video.repository";
import { ProductTagRepository } from "./repositories/product-tag.repository";
import { ProductPhotoRepository } from "./repositories/product-photo.repository";
import { ImageModule } from "../image/image.module";
import { RegionProductRepository } from "./repositories/region-product.repository";

@Module({
    imports: [
        VideoModule,
        ImageModule,
    ],
    controllers: [],
    providers: [
        ProductRepository,
        ProductVideoRepository,
        ProductTagRepository,
        ProductPhotoRepository,
        RegionProductRepository,
    ],
    exports: [
        ProductVideoRepository,
        ProductTagRepository,
        ProductPhotoRepository,
        ProductRepository,
        RegionProductRepository,
    ],
})
export class ProductModule {}
