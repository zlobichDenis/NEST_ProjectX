import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { S3 } from "aws-sdk";
import { DeletedObjects } from "aws-sdk/clients/s3";

type S3BucketClientServiceConfig = {
    bucketName: string;
};

@Injectable()
export class S3BucketService
{
    private config: S3BucketClientServiceConfig;
    private s3Client = new S3();

    public constructor(private readonly configService: ConfigService)
    {
        this.config = { bucketName: this.configService.get("awsPublicBucketName") };
    }

    public async uploadPublicFile(
        dataBuffer: Buffer,
        folderName: string,
        fileName: string,
    ): Promise<S3.ManagedUpload.SendData>
    {
        const uploadResult = await this.s3Client.upload({
            Bucket: this.configService.get("awsPublicBucketName"),
            Body: dataBuffer,
            Key: `${folderName}/${uuid()}-${fileName}`,
        }).promise();

        console.log(uploadResult);

        return uploadResult;
    }

    public async uploadPublicFiles(
        files: Express.Multer.File[],
        folderName: string,
    ): Promise<S3.ManagedUpload.SendData[]>
    {
        return Promise.all(files.map((file) => this.uploadPublicFile(file.buffer, folderName, file.originalname)));
    }

    public async deletePublicFiles(keys: string[]): Promise<DeletedObjects | undefined>
    {
        const keysArr = keys.map((key) =>
        {
            return { Key: key };
        });

        const result = await this.s3Client.deleteObjects({
            Bucket: this.configService.get("awsPublicBucketName"),
            Delete: { Objects: keysArr },
        }).promise();

        return result.Deleted;
    }
}
