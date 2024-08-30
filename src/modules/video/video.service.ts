import { Injectable } from "@nestjs/common";
import { VideoRepository } from "./video.repository";
import { S3BucketService } from "../../shared/s3-bucket-client/s3-bucket.service";
import { UploadVideoDto } from "./requests/upload-video.dto";
import { CreateVideoDto } from "./requests/create-video.dto";
import { VideoEntity } from "./entities/video.entity";

type VideoServiceConfig = {
    bucketFolderName: "product-videos",
};

@Injectable()
export class VideoService
{
    private config: VideoServiceConfig = { bucketFolderName: "product-videos" };

    public constructor(
        private readonly videoRepository: VideoRepository,
        private readonly s3BucketService: S3BucketService
    ) {}

    public async uploadVideo({ id, file, name }: UploadVideoDto): Promise<VideoEntity>
    {
        const uploadResult = await this.s3BucketService.uploadPublicFile(
            file.buffer,
            this.config.bucketFolderName,
            file.originalname,
        );

        const createVideoDto = new CreateVideoDto(id, name, uploadResult.Key, uploadResult.Location);

        return this.videoRepository.createVideo(createVideoDto);
    }

    public async deleteVideos(videos: VideoEntity[]): Promise<void>
    {
        const ids = [];
        const keys = [];

        videos.forEach(({ id, file }) =>
        {
            ids.push(id);
            keys.push(file.key);
        });

        await this.s3BucketService.deletePublicFiles(keys);
        await this.videoRepository.deleteVideoByIds(ids);
    }
}
