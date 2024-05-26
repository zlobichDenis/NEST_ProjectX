import { ConsoleLogger, Injectable } from "@nestjs/common";
import { CloudWatchService } from "../cloud-watch-client";

type LogMessage = {
    description: string;
    placement: string;
    data: any;
};

enum LogLevel
{
    ERROR = "error",
    LOG = "log",
}

@Injectable()
export class Logger extends ConsoleLogger
{
    public constructor(private readonly cloudWatchService: CloudWatchService)
    {
        super();
    }

    public log(message: LogMessage): void
    {
        super.log(message);

        this.cloudWatchService.log(this.logMessageToString(LogLevel.LOG, message));
    }

    public error(message: LogMessage): void
    {
        super.error(message);

        this.cloudWatchService.log(this.logMessageToString(LogLevel.ERROR, message));
    }

    private logMessageToString(level: LogLevel, message: LogMessage): string
    {
        return JSON.stringify({ level, ...message });
    }
}
