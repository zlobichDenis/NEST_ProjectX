import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { ImageEntity } from "./entities/image.entity";
import { CreateImageDto } from "./requests/create-image.dto";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";
import { PublicFileRepository } from "../public-file/repositories/public-file.repository";
import { CreateFileDto } from "../public-file/requests/create-file.dto";

@Injectable()
export class ImageRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly publicFileRepository: PublicFileRepository,
    ) {}

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

    public async createImages(
        dtos: CreateFileDto[],
        transaction: PrismaTransaction = this.prismaService,
    ): Promise<ImageEntity[]>
    {
        const createdFiles = await this.publicFileRepository.createFiles(dtos, transaction);

        const createImagesDto = createdFiles.map((file) => new CreateImageDto({ fileId: file.id }));

        await transaction.image.createMany({
            data: createImagesDto.map(({ id, fileId }) => ({
                id,
                file_id: fileId,
            })),
        });

        const createdImages = await transaction.image.findMany({
            where:
              { id: { in: createImagesDto.map(({ id }) => id) } },
        });

        return createdImages.map((image) => new ImageEntity(image));
    }

    public async getImageById(id: string): Promise<ImageEntity>
    {
        const photo = await this.prismaService.image.findFirst({ where: { id }, include: { file: true } });

        return new ImageEntity(photo).setFile(new PublicFileEntity(photo.file));
    }

    public async deleteImagesByIds(imageIds: string[], transaction: PrismaTransaction = this.prismaService)
    {
        await transaction.image.deleteMany({ where: { id: { in: imageIds } } });
    }
}
