import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { SellerRepository } from "./seller.repository";
import { AddressModule } from "../address/address.module";
import { SellerAddressRepository } from "./repositories/seller-address.repository";

@Module({
    imports: [AddressModule],
    controllers: [SellerController],
    providers: [SellerService, SellerRepository, SellerAddressRepository],
    exports: [SellerService, SellerRepository],
})
export class SellerModule {}
