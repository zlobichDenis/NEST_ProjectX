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
export class LoggerService extends ConsoleLogger
{
    public constructor(private readonly cloudWatchService: CloudWatchService)
    {
        super();
    }

    public log(message: LogMessage): void
    {
        super.log(message);

        this.logMessage(message);
        // this.cloudWatchService.log(this.logMessageToString(LogLevel.LOG, message));
    }

    public error(message: LogMessage): void
    {
        super.error(message);

        this.logMessage(message);
        // this.cloudWatchService.log(this.logMessageToString(LogLevel.ERROR, message));
    }

    public logMessage(message: LogMessage): void
    {
        console.log(message);
    }

    private logMessageToString(level: LogLevel, message: LogMessage): string
    {
        return JSON.stringify({ level, ...message });
    }
}
