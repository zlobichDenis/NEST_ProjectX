import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { SellerRepository } from "./seller.repository";
import { AddressModule } from "../address/address.module";
import { SellerAddressRepository } from "./repositories/seller-address.repository";
import { FileModule } from "../public-file/file.module";
import { LogoFileController } from "./controllers/logo-file.controller";
import { LogoFileService } from "./services/logo-file.service";

@Module({
    imports: [AddressModule, FileModule],
    controllers: [SellerController, LogoFileController],
    providers: [SellerService, SellerRepository, SellerAddressRepository, LogoFileService],
    exports: [SellerService, SellerRepository],
})
export class SellerModule {}
