import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagRepository } from "./tag.repository";
import { TagService } from "./tag.service";

@Module({
    imports: [],
    controllers: [TagController],
    providers: [
        TagRepository,
        TagService,
    ],
    exports: [],
})
export class TagModule {}
