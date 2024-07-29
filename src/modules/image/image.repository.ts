import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { ImageEntity } from "./entities/image.entity";
import { CreateImageDto } from "./requests/create-image.dto";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";

@Injectable()
export class ImageRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createImage(dto: CreateImageDto, transaction?: PrismaTransaction): Promise<ImageEntity>
    {
        const client = transaction || this.prismaService;

        const photo = await client.image.create({
            data: {
                id: dto.id,
                file_id: dto.fileId,
            },
        });

        return new ImageEntity(photo);
    }

    public async getImageById(id: string): Promise<ImageEntity>
    {
        const photo = await this.prismaService.image.findFirst({ where: { id }, include: { file: true } });

        return new ImageEntity(photo).setFile(new PublicFileEntity(photo.file));
    }
}
