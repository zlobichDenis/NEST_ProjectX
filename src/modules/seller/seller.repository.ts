import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { SellerEntity } from "./entities/seller.entity";
import { AddressRepository } from "../address/address.repository";
import { SellerAddressRepository } from "./repositories/seller-address.repository";
import { CreateSellerAddressDto } from "./requests/create-seller-address.dto";
import { PublicFileRepository } from "../public-file/repositories/public-file.repository";
import { CreateFileDto } from "../public-file/requests/create-file.dto";
import { CreateImageDto } from "../image/requests/create-image.dto";
import { ImageRepository } from "../image/image.repository";
import { CreateAddressDto } from "../address/requests/create-address.dto";

@Injectable()
export class SellerRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly addressRepository: AddressRepository,
        private readonly sellerAddressRepository: SellerAddressRepository,
        private readonly publicFileRepository: PublicFileRepository,
        private readonly imageRepository: ImageRepository,
    ) {}

    public async createSeller({
        apartment,
        houseNumber,
        country,
        city,
        postIndex,
        street,
        id,
        userId,
        displayName,
        fullName,
        description,
        contactPhoneNumber,
        contactEmail,
    }: CreateSellerDto): Promise<SellerEntity>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const seller = await transaction.seller.create({
                data: {
                    id: id,
                    user_id: userId,
                    display_name: displayName,
                    full_name: fullName,
                    description: description,
                    contact_phone_number: contactPhoneNumber,
                    contact_email: contactEmail,
                },
            });

            const createAddressDto = new CreateAddressDto({
                apartment,
                houseNumber,
                city,
                country,
                street,
                postIndex,
            });

            const address = await this.addressRepository.createAddress(createAddressDto, transaction);

            await this.sellerAddressRepository.createSellerAddress(
                new CreateSellerAddressDto(seller.id, address.id),
                transaction
            );

            return seller ? new SellerEntity(seller).setAddresses([address]) : null ;
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

        if (!sellerEntity) return null;

        const addressIds = sellerEntity?.seller_address.map(({ address_id }) => address_id);

        const addresses = addressIds ? await this.addressRepository.getAddressBatchByIds(addressIds) : null;

        const logoFile = sellerEntity.logo?.file_id
            ? await this.publicFileRepository.getFileById(sellerEntity.logo.file_id)
            : undefined;

        return sellerEntity
            ? new SellerEntity(sellerEntity)
                .setUser(sellerEntity.user)
                .setAddresses(addresses)
                .setLogo(logoFile)
            : null;
    }

    public async attachLogo(sellerId: string, file: CreateFileDto): Promise<SellerEntity>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const publicFile = await this.publicFileRepository.createFile(file, transaction);

            const image = await this.imageRepository.createImage(
                new CreateImageDto({ fileId: publicFile.id }),
                transaction,
            );

            const sellerEntity = await transaction.seller.update({
                where: { id : sellerId },
                data: { logo_id: image.id },
            });

            return new SellerEntity(sellerEntity);
        });
    }

    public async deleteSellerByUserId(userId: string): Promise<SellerEntity>
    {
        const deletedSeller = await this.prismaService.seller.delete({ where: { user_id: userId } });

        return new SellerEntity(deletedSeller);
    }
}
