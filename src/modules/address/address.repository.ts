import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { AddressEntity } from "./entities/address.entity";
import { CreateAddressDto } from "./requests/create-address.dto";
import { PrismaTransaction } from "../../shared/prisma-client/types";

@Injectable()
export class AddressRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createAddress(
        dto: CreateAddressDto,
        transaction?: PrismaTransaction,
    ): Promise<AddressEntity>
    {
        const client = transaction || this.prismaService;

        const createdAddress = await client.address.create({
            data: {
                id: dto.id,
                country: dto.country,
                street: dto.street,
                city: dto.city,
                house_number: dto.houseNumber,
                post_index: dto.postIndex,
            },
        });

        return new AddressEntity(createdAddress);
    }

    public async getAddressById(id: string): Promise<AddressEntity>
    {
        const address = await this.prismaService.address.findFirst({ where: { id: id } });

        return new AddressEntity(address);
    }
}
