import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoRepository } from "./video.repository";
import { FileModule } from "../public-file/file.module";
import { EventListener } from "./events/event.listener";
import { VideoController } from "./video.controller";

@Module({
    imports: [
        FileModule,
    ],
    controllers: [
        VideoController,
    ],
    providers: [
        EventListener,
        VideoService,
        VideoRepository,
    ],
    exports: [
        VideoService,
        VideoRepository,
    ],
})
export class VideoModule {}
