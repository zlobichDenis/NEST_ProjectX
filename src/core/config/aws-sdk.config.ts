type AwsSdkConfig = {
    awsRegion: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    cloudWatchGroupName: string;
    cloudWatchStreamName: string;
};

export const getAwsSdkConfig = (): AwsSdkConfig =>
{
    return {
        awsRegion: process.env.AWS_REGION,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        cloudWatchGroupName: process.env.AWS_CLOUDWATCH_GROUP_NAME,
        cloudWatchStreamName: process.env.AWS_CLOUDWATCH_STREAM_NAME,
    };
};
