import { Module } from "@nestjs/common";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";
import { FileModule } from "../public-file/file.module";

@Module({
    imports: [
        FileModule,
    ],
    controllers: [],
    providers: [
        ImageRepository,
        ImageService,
    ],
    exports: [
        ImageRepository,
        ImageService,
    ],
})
export class ImageModule {}
