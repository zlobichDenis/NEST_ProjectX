import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressRepository } from "./address.repository";

@Module({
    imports: [],
    providers: [AddressService, AddressRepository],
    controllers: [],
    exports: [AddressService, AddressRepository],
})
export class AddressModule {}
