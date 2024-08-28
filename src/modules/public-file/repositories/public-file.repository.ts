import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { CreateFileDto } from "../requests/create-file.dto";
import { PublicFileEntity } from "../entities/public-file.entity";
import { PrismaTransaction } from "../../../shared/prisma-client/types";

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

    public async createFiles(dtos: CreateFileDto[], transaction?: PrismaTransaction): Promise<PublicFileEntity[]>
    {
        const client = transaction || this.prismaService;

        await client.public_file.createMany({
            data: dtos.map((dto) => ({
                id: dto.id,
                url: dto.url,
                key: dto.key,
            })),
        });

        const createdFiles = await client.public_file.findMany({ where: { id: { in: dtos.map(({ id }) => id) } } });

        return createdFiles.map((file) => new PublicFileEntity(file));
    }

    public async getFileById(id: string): Promise<PublicFileEntity>
    {
        const file = await this.prismaService.public_file.findUnique({ where: { id } });

        return new PublicFileEntity(file);
    }
}
