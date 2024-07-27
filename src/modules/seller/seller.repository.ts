import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { SellerEntity } from "./entities/seller.entity";

@Injectable()
export class SellerRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createSeller(dto: CreateSellerDto): Promise<SellerEntity>
    {
        const sellerEntity = await this.prismaService.seller.create({
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

        return sellerEntity ? new SellerEntity(sellerEntity) : null;
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
            include: {
                user: true,
            },
        });

        return sellerEntity ? new SellerEntity(sellerEntity).setUser(sellerEntity.user) : null;
    }
}
