import { Injectable } from "@nestjs/common";
import { ImageRepository } from "./image.repository";
import { S3BucketService } from "../../shared/s3-bucket-client/s3-bucket.service";
import { UploadImageDto } from "./requests/upload-image.dto";
import { CreateFileDto } from "../public-file/requests/create-file.dto";
import { ImageEntity } from "./entities/image.entity";

@Injectable()
export class ImageService
{
    public constructor(
        private readonly imageRepository: ImageRepository,
        private readonly s3BucketService: S3BucketService,
    ) {}

    public async createImages(dtos: UploadImageDto[], folderName: string): Promise<ImageEntity[]>
    {
        const uploadResult = await this.s3BucketService.uploadPublicFiles(dtos.map((dto) => dto.file), folderName);

        const createImageDtos = uploadResult.map((result) => new CreateFileDto({
            url: result.Location,
            key: result.Key,
        }));

        return this.imageRepository.createImages(createImageDtos);
    }
}
