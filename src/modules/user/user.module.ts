import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserEventListener } from "./events/user.listener";
import { ImageModule } from "../image/image.module";

@Module({
    imports: [
        ImageModule,
    ],
    providers: [
        UserRepository,
        UserService,
        UserEventListener,
    ],
    exports: [
        UserService,
        UserRepository,
    ],
    controllers: [],
})
export class UserModule {}
