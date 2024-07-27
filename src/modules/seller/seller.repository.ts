import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { SellerEntity } from "./entities/seller.entity";
import { AddressRepository } from "../address/address.repository";
import { SellerAddressRepository } from "./repositories/seller-address.repository";
import { CreateSellerAddressDto } from "./requests/create-seller-address.dto";

@Injectable()
export class SellerRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly addressRepository: AddressRepository,
        private readonly sellerAddressRepository: SellerAddressRepository,
    ) {}

    public async createSeller({ address: createAddressDto, ...dto }: CreateSellerDto): Promise<SellerEntity>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const seller = await transaction.seller.create({
                data: {
                    id: dto.id,
                    user_id: dto.userId,
                    display_name: dto.displayName,
                    full_name: dto.fullName,
                    description: dto.description,
                    logo: dto.logo,
                    contact_phone_number: dto.contactPhoneNumber,
                },
            });

            const address = await this.addressRepository.createAddress(createAddressDto, transaction);

            await this.sellerAddressRepository.createSellerAddress(
                new CreateSellerAddressDto(seller.id, address.id),
                transaction
            );

            return seller ? new SellerEntity(seller).setAddress(address) : null ;
        });
    }

    public async getSellerById(id: string): Promise<SellerEntity | void>
    {
        const sellerEntity = await this.prismaService.seller.findUnique({ where: { id }, include: { user: true } });

        return sellerEntity ? new SellerEntity(sellerEntity).setUser(sellerEntity.user) : null;
    }

    public async getSellerByUserId(userId: string): Promise<SellerEntity | null>
    {
        const sellerEntity = await this.prismaService.seller.findUnique({
            where: { user_id: userId },
            include: { user: true },
        });

        return sellerEntity ? new SellerEntity(sellerEntity).setUser(sellerEntity.user) : null;
    }
}
