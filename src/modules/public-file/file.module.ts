import { Module } from "@nestjs/common";
import { PublicFileRepository } from "./repositories/public-file.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [PublicFileRepository],
    exports: [PublicFileRepository],
})
export class FileModule {}
