import { Module } from "@nestjs/common";
import { SharedModule } from "./shared";
import { AuthModule } from "./modules";
import { UserModule } from "./modules/user";

@Module({
    imports: [SharedModule, AuthModule, UserModule],
    controllers: [],
    providers: [],
    exports: [SharedModule],
})
export class AppModule {}
