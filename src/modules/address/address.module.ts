import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressRepository } from "./address.repository";
import { EventListener } from "./events/event.listener";

@Module({
    imports: [],
    providers: [
        EventListener,
        AddressService,
        AddressRepository,
    ],
    controllers: [],
    exports: [
        AddressService,
        AddressRepository,
    ],
})
export class AddressModule {}
