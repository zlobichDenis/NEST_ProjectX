import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserEventListener } from "./events/user.listener";

@Module({
    imports: [],
    providers: [
        UserRepository,
        UserService,
        UserEventListener],
    exports: [
        UserService,
        UserRepository,
    ],
    controllers: [],
})
export class UserModule {}
