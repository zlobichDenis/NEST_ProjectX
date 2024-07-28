import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { SellerEntity } from "./entities/seller.entity";
import { AddressRepository } from "../address/address.repository";
import { SellerAddressRepository } from "./repositories/seller-address.repository";
import { CreateSellerAddressDto } from "./requests/create-seller-address.dto";
import { PublicFileRepository } from "../public-file/repositories/public-file.repository";
import { CreateFileDto } from "../public-file/requests/create-file.dto";

@Injectable()
export class SellerRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly addressRepository: AddressRepository,
        private readonly sellerAddressRepository: SellerAddressRepository,
        private readonly publicFileRepository: PublicFileRepository,
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
            include: { user: true, logo: true, seller_address: true },
        });

        const address = await this.addressRepository.getAddressById(sellerEntity.seller_address[0].address_id);

        return sellerEntity
            ? new SellerEntity(sellerEntity)
                .setUser(sellerEntity.user)
                .setAddress(address)
                .setLogo(sellerEntity.logo)
            : null;
    }

    public async attachLogo(sellerId: string, logoFile: CreateFileDto): Promise<SellerEntity>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const publicFile = await this.publicFileRepository.createFile(logoFile, transaction);

            const sellerEntity = await transaction.seller.update({
                where: { id : sellerId },
                data: { logo_file_id: publicFile.id },
            });

            return new SellerEntity(sellerEntity);
        });
    }
}
