import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";
import { AuthModule } from "../auth";

@Module({
    imports: [AuthModule],
    controllers: [ProfileController],
    providers: [
        ProfileService,
        ProfileRepository,
    ],
    exports: [],
})
export class ProfileModule {}
