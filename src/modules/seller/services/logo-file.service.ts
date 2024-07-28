import { Injectable } from "@nestjs/common";
import { S3BucketService } from "../../../shared/s3-bucket-client/s3-bucket.service";
import { SellerRepository } from "../seller.repository";
import { CreateFileDto } from "../../public-file/requests/create-file.dto";
import { SellerEntity } from "../entities/seller.entity";

@Injectable()
export class LogoFileService
{
    public constructor(
        private readonly s3BucketService: S3BucketService,
        private readonly sellerRepository: SellerRepository,
    ) {}

    public async uploadLogo(sellerUserId: string, file: Express.Multer.File): Promise<SellerEntity>
    {
        const seller = await this.sellerRepository.getSellerByUserId(sellerUserId);

        const uploadResult = await this.s3BucketService.uploadPublicFile(file.buffer, seller.id, file.originalname);

        return this.sellerRepository.attachLogo(seller.id, new CreateFileDto({
            url: uploadResult.Location,
            key: uploadResult.Key,
        }));
    }
}
