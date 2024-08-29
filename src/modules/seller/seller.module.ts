import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { SellerRepository } from "./seller.repository";
import { AddressModule } from "../address/address.module";
import { SellerAddressRepository } from "./repositories/seller-address.repository";
import { FileModule } from "../public-file/file.module";
import { LogoFileController } from "./controllers/logo-file.controller";
import { LogoFileService } from "./services/logo-file.service";
import { ImageModule } from "../image/image.module";
import { VideoModule } from "../video/video.module";
import { ProductModule } from "../product/product.module";
import { SellerProductController } from "./controllers/seller-product.controller";
import { SellerProductService } from "./services/seller-product.service";
import { SellerProductRepository } from "./repositories/seller-product.repository";

@Module({
    imports: [
        AddressModule,
        FileModule,
        ImageModule,
        VideoModule,
        ProductModule,
        VideoModule,
    ],
    controllers: [
        SellerController,
        LogoFileController,
        SellerProductController,
    ],
    providers: [
        SellerProductRepository,
        SellerProductService,
        SellerService,
        SellerRepository,
        SellerAddressRepository,
        LogoFileService,
    ],
    exports: [
        SellerService,
        SellerRepository,
    ],
})
export class SellerModule {}
