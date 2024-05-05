import { Module } from "@nestjs/common";
import { SharedModule } from "./shared";
import { AuthModule } from "./modules";

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [],
    providers: [],
    exports: [SharedModule],
})
export class AppModule {}
