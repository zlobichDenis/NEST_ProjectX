import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./address.repository";
import { CreateAddressDto } from "./requests/create-address.dto";
import { CreateAddressResponse } from "./responses/create-address.response";

@Injectable()
export class AddressService
{
    public constructor(private readonly addressRepository: AddressRepository) {}

    public async createAddress(dto: CreateAddressDto): Promise<CreateAddressResponse | void>
    {
        const createdAddress = await this.addressRepository.createAddress(dto);

        return createdAddress ? new CreateAddressResponse(createdAddress) : null;
    }
}
