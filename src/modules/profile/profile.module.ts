import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";
import { AddressModule } from "../address/address.module";
import { ProfileAddressRepository } from "./profile-addres/profile-address.repository";
import { EventDispatcher } from "./events/event.dispatcher";
import { ImageModule } from "../image/image.module";
import { ProfileAddressController } from "./profile-addres/profile-address.controller";
import { ProfileAddressService } from "./profile-addres/profile-address.service";

@Module({
    imports: [
        ImageModule,
        AddressModule,
    ],
    controllers: [
        ProfileController,
        ProfileAddressController,
    ],
    providers: [
        EventDispatcher,
        ProfileService,
        ProfileRepository,
        ProfileAddressService,
        ProfileAddressRepository,
    ],
    exports: [
        ProfileService,
        ProfileRepository,
        AddressModule,
        ProfileAddressRepository,
    ],
})
export class ProfileModule {}
