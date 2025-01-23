import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { AddressRepository } from "../../address/address.repository";
import { ProfileAddressEntity } from "./entities/profile-address.entity";
import { CreateProfileAddressDto } from "./dto/create-profile-address.dto";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { AddressEntity } from "../../address/entities/address.entity";
import { GetProfileAddressListDto } from "./dto/get-profile-adress-list.dto";

@Injectable()
export class ProfileAddressRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly addressRepository: AddressRepository,
    ) {}

    public async createProfileAddress(
        dto: CreateProfileAddressDto,
        transaction?: PrismaTransaction,
    ): Promise<ProfileAddressEntity>
    {
        if (transaction)
        {
            const address = await this.addressRepository.createAddress(dto.createAddressDto, transaction);

            const profileAddress = await transaction.profile_address.create({
                data: {
                    profile_id: dto.profileId,
                    address_id: address.id,
                },
                include: { address: true },
            });

            return new ProfileAddressEntity(profileAddress, address);
        }

        return this.prismaService.$transaction(async (transaction) =>
        {
            const address = await this.addressRepository.createAddress(dto.createAddressDto, transaction);

            const profileAddress = await transaction.profile_address.create({
                data: {
                    profile_id: dto.profileId,
                    address_id: address.id,
                },
                include: { address: true },
            });

            return new ProfileAddressEntity(profileAddress, address);
        });
    }

    public async getProfileAddressByAddressId(addressId: string): Promise<ProfileAddressEntity | null>
    {
        const profileAddress = await this.prismaService
            .profile_address
            .findUnique({
                where: { address_id: addressId },
                include: { address: true },
            });

        return profileAddress
            ? new ProfileAddressEntity(profileAddress, new AddressEntity(profileAddress.address))
            : null;
    }

    public async getProfileAddressList(dto: GetProfileAddressListDto): Promise<ProfileAddressEntity[]>
    {
        const profileAddresses = await this.prismaService
            .profile_address
            .findMany({
                ...dto.cursor ? { cursor: { address_id: dto.cursor } } : undefined,
                ...dto.limit ? { take: dto.limit, skip: dto.cursor ? 1 : undefined } : undefined,
                where: { ...dto.profileId ? { profile_id: dto.profileId } : undefined },
                include: { address: true },
            });

        return profileAddresses.length
            ? profileAddresses.map((profileAddress) =>
            {
                return new ProfileAddressEntity(profileAddress, new AddressEntity(profileAddress.address));
            })
            : null;
    }
}
