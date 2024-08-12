import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoRepository } from "./video.repository";
import { FileModule } from "../public-file/file.module";

@Module({
    imports: [
        FileModule,
    ],
    controllers: [],
    providers: [
        VideoService,
        VideoRepository,
    ],
    exports: [
        VideoService,
        VideoRepository,
    ],
})
export class VideoModule {}
