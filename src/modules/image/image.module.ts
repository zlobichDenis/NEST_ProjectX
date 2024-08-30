import { Module } from "@nestjs/common";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";
import { FileModule } from "../public-file/file.module";
import { EventListener } from "./events/event.listener";

@Module({
    imports: [
        FileModule,
    ],
    controllers: [],
    providers: [
        EventListener,
        ImageRepository,
        ImageService,
    ],
    exports: [
        ImageRepository,
        ImageService,
    ],
})
export class ImageModule {}
