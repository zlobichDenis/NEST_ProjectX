import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoRepository } from "./video.repository";
import { FileModule } from "../public-file/file.module";
import { EventListener } from "./events/event.listener";

@Module({
    imports: [
        FileModule,
    ],
    controllers: [],
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
