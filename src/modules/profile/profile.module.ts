import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";
import { AddressModule } from "../address/address.module";
import { ProfileAddressRepository } from "./repositories/profile-address.repository";

@Module({
    imports: [AddressModule],
    controllers: [ProfileController],
    providers: [
        ProfileService,
        ProfileRepository,
        ProfileAddressRepository,
    ],
    exports: [],
})
export class ProfileModule {}
