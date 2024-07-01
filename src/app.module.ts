import { Module } from "@nestjs/common";
import { SharedModule } from "./shared";
import { AuthModule } from "./modules";
import { UserModule } from "./modules/user";
import { ProfileModule } from "./modules/profile/profile.module";

@Module({
    imports: [SharedModule, AuthModule, UserModule, ProfileModule],
    controllers: [],
    providers: [],
    exports: [SharedModule],
})
export class AppModule {}
