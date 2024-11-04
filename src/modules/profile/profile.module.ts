import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";
import { AddressModule } from "../address/address.module";
import { ProfileAddressRepository } from "./repositories/profile-address.repository";
import { EventDispatcher } from "./events/event.dispatcher";
import { ImageModule } from "../image/image.module";

@Module({
    imports: [
        ImageModule,
        AddressModule,
    ],
    controllers: [ProfileController],
    providers: [
        EventDispatcher,
        ProfileService,
        ProfileRepository,
        ProfileAddressRepository,
    ],
    exports: [
        ProfileService,
        ProfileRepository,
    ],
})
export class ProfileModule {}
