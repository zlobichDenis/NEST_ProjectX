import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";
import { AuthModule } from "../auth";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository],
    imports: [AuthModule],
    exports: [],
})
export class ProfileModule {}