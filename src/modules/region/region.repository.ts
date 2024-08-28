import { Injectable } from "@nestjs/common";
import { region_key as RegionKey } from "@prisma/client";
import { PrismaService } from "../../shared/prisma-client";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { RegionEntity } from "./entities/region.entity";

@Injectable()
export class RegionRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async getRegionByKey(
        key: RegionKey,
        transaction: PrismaTransaction = this.prismaService,
    ): Promise<RegionEntity>
    {
        const region = await transaction.region.findUnique({ where: { key } });

        return new RegionEntity(region);
    }
}
