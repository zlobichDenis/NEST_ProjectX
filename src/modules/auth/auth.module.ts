import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { AuthController } from "./auth.controller";
import { JwtStrategy, JWTRefreshTokenStrategy } from "./strategies";
import { UserModule } from "../user";
import { AuthService } from "./auth.service";
import { GoogleAuthService } from "./services";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthInternalService } from "./internal/auth-internal.service";
import { AuthInternalController } from "./internal/auth-internal.controller";
import { YandexAuthService } from "./services/yandex-auth.service";

@Global()
@Module({
    imports: [
        HttpModule,
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
    exports: [JwtStrategy, JWTRefreshTokenStrategy],
    controllers: [AuthController, AuthInternalController],
    providers: [
        JwtStrategy,
        AuthService,
        JWTRefreshTokenStrategy,
        GoogleAuthService,
        LocalStrategy,
        AuthInternalService,
        YandexAuthService,
    ],
})
export class AuthModule {}
