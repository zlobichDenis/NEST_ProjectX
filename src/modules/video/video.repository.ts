import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { VideoEntity } from "./entities/video.entity";
import { PublicFileRepository } from "../public-file/repositories/public-file.repository";
import { CreateVideoDto } from "./requests/create-video.dto";
import { CreateFileDto } from "../public-file/requests/create-file.dto";
import { GetVideoListDto } from "./requests/get-video-list.dto";
import { TagEntity } from "../tag/entites/tag.entity";
import { ImageEntity } from "../image/entities/image.entity";
import { PublicFileEntity } from "../public-file/entities/public-file.entity";
import { ProductEntity } from "../product/entites/product.entity";

@Injectable()
export class VideoRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly publicFileRepository: PublicFileRepository,
    ) {}

    public async createVideo(
        {
            id,
            name,
            key,
            location,
        }: CreateVideoDto,
        transaction?: PrismaTransaction,
    ): Promise<VideoEntity>
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

    public async getVideoList(query: GetVideoListDto)
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const dbQuery = {
                ...query.cursor ? { cursor: { id: query.cursor } } : undefined,
                ...query.limit ? { take: query.limit, skip: query.cursor ? 1 : undefined } : undefined,
                orderBy: { created_at: "desc" } as any,
                include: {
                    file: true,
                    product_videos: {
                        include: {
                            product: {
                                include: {
                                    tags: { include: { tag: true } },
                                    product_photos: { include: { photo: { include: { file: true } } } },
                                },
                            },
                        },
                    },
                },
            };

            const videos = await transaction.video.findMany(dbQuery);
            const total = await transaction.video
                .count({ ...query.cursor ? { cursor: { id: query.cursor } } : undefined });

            return videos.map((video) =>
            {
                const products = video.product_videos.map((product) =>
                {
                    const tags = product.product.tags.map(({ tag }) => new TagEntity(tag));
                    const images = product.product.product_photos.map((photo) =>
                    {
                        const fileEntity = new PublicFileEntity(photo.photo.file);

                        return new ImageEntity(photo.photo).setFile(fileEntity);
                    });

                    return new ProductEntity(product.product)
                        .setTags(tags)
                        .setImages(images);
                });

                const file = new PublicFileEntity(video.file);

                return new VideoEntity(video)
                    .setFile(file)
                    .setTotal(total)
                // only one product might because of constraint in product_videos table
                    .setProduct(products[0]);
            });
        });
    }
}
