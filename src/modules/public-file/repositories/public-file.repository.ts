import { PrismaService } from "../../../shared/prisma-client";
import { CreateFileDto } from "../requests/create-file.dto";
import { PublicFileEntity } from "../entities/public-file.entity";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PublicFileRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createFile(dto: CreateFileDto, transaction?: PrismaTransaction): Promise<PublicFileEntity>
    {
        const client = transaction || this.prismaService;

        const file = await client.public_file.create({
            data: {
                id: dto.id,
                key: dto.key,
                url: dto.url,
            },
        });

        return new PublicFileEntity(file);
    }

    public async getFileById(id: string): Promise<PublicFileEntity>
    {
        const file = await this.prismaService.public_file.findUnique({ where: { id } });

        return new PublicFileEntity(file);
    }
}
