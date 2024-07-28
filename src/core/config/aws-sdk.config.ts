type AwsSdkConfig = {
    awsRegion: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    awsPublicBucketName: string;
};

export const getAwsSdkConfig = (): AwsSdkConfig =>
{
    return {
        awsRegion: process.env.AWS_REGION,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        awsPublicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    };
};
