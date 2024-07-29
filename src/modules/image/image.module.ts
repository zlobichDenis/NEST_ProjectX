import { Module } from "@nestjs/common";
import { ImageRepository } from "./image.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        ImageRepository,
    ],
    exports: [ImageRepository],
})
export class ImageModule {}
