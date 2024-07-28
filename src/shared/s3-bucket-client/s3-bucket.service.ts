import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { S3 } from "aws-sdk";

type S3BucketClientServiceConfig = {
    bucketName: string;
};

@Injectable()
export class S3BucketService
{
    private config: S3BucketClientServiceConfig;

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
        const s3 = new S3();

        const uploadResult = await s3.upload({
            Bucket: this.configService.get("awsPublicBucketName"),
            Body: dataBuffer,
            Key: `${folderName}/${uuid()}-${fileName}`,
        }).promise();

        console.log(uploadResult);

        return uploadResult;
    }
}
