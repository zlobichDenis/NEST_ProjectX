import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  CloudWatchLogs, Credentials } from "aws-sdk";
import { EventMessage } from "aws-sdk/clients/cloudwatchlogs";

type CloudWatchServiceConfig = {
    groupName: string;
    streamName: string;
};

@Injectable()
export class CloudWatchService
{
    private cloudWatch: CloudWatchLogs;
    private config: CloudWatchServiceConfig;

    public constructor(private readonly configService: ConfigService)
    {
        this.cloudWatch = new CloudWatchLogs({
            credentials: new Credentials({
                accessKeyId: this.configService.get("awsAccessKey"),
                secretAccessKey: this.configService.get("awsSecretAccessKey"),
            }),
            region: this.configService.get("awsRegion"),
        });

        this.config = {
            groupName: this.configService.get("cloudWatchGroupName"),
            streamName: this.configService.get("cloudWatchStreamName"),
        };
    }

    public async log(message: EventMessage)
    {
        try
        {
            this.cloudWatch.putLogEvents({
                logGroupName: this.config.groupName,
                logStreamName: this.config.streamName,
                logEvents: [
                    {
                        message,
                        timestamp: new Date().getTime(),
                    },
                ],
            });
        }
        catch (error)
        {
            console.error(error);
        }
    }
}
