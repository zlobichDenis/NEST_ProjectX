import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { VideoEntity } from "./entities/video.entity";
import { PublicFileRepository } from "../public-file/repositories/public-file.repository";
import { CreateVideoDto } from "./requests/create-video.dto";
import { CreateFileDto } from "../public-file/requests/create-file.dto";

@Injectable()
export class VideoRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly publicFileRepository: PublicFileRepository,
    ) {}

    public async createVideo({
        id,
        name,
        key,
        location,
    }: CreateVideoDto, transaction?: PrismaTransaction): Promise<VideoEntity>
    {
        const client = transaction || this.prismaService;

        const publicFile = await this.publicFileRepository.createFile(
            new CreateFileDto({ url: location, key }),
            transaction
        );

        const video = await client.video.create({
            data: {
                id,
                name,
                file_id: publicFile.id,
            },
        });

        return new VideoEntity(video);
    }

    public async deleteVideoByIds(
        videoIds: string[],
        transaction: PrismaTransaction = this.prismaService
    ): Promise<void>
    {
        await transaction.video.deleteMany({ where: { id: { in: videoIds } } });
    }
}
