import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [],
    providers: [UserRepository, UserService],
    exports: [UserService],
    controllers: [],
})
export class UserModule {}
