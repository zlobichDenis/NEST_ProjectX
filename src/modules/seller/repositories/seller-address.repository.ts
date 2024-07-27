import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { CreateSellerAddressDto } from "../requests/create-seller-address.dto";
import { SellerAddressEntity } from "../entities/seller-address.entity";
import { PrismaTransaction } from "../../../shared/prisma-client/types";

@Injectable()
export class SellerAddressRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createSellerAddress(
        dto: CreateSellerAddressDto,
        transaction?: PrismaTransaction,
    ): Promise<SellerAddressEntity>
    {
        const client = transaction || this.prismaService;

        const sellerAddress = await client.seller_address.create({
            data: {
                address_id: dto.addressId,
                seller_id: dto.sellerId,
            },
        });

        return new SellerAddressEntity(sellerAddress);
    }
}
