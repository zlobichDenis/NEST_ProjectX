import { Module } from "@nestjs/common";
import { SharedModule } from "./shared";
import { AuthModule } from "./modules";
import { UserModule } from "./modules/user";
import { ProfileModule } from "./modules/profile/profile.module";
import { SellerModule } from "./modules/seller/seller.module";
import { AddressModule } from "./modules/address/address.module";

@Module({
    imports: [
        SharedModule,
        AuthModule,
        UserModule,
        ProfileModule,
        SellerModule,
        AddressModule
    ],
    controllers: [],
    providers: [],
    exports: [SharedModule],
})
export class AppModule {}
