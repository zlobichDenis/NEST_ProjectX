import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { JwtStrategy, JWTRefreshTokenStrategy } from "./strategies";
import { UserModule } from "../user";
import { AuthService } from "./auth.service";

@Global()
@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                ({
                    secret: configService.get("jwtSecret"),
                    signOptions: { expiresIn: configService.get("jwtExpires") },
                }),
        }),
    ],
    exports: [],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService, JWTRefreshTokenStrategy],
})
export class AuthModule {}
