import { Module } from "@nestjs/common";
import { RegionRepository } from "./region.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        RegionRepository,
    ],
    exports: [
        RegionRepository,
    ],
})
export class RegionModule {}
