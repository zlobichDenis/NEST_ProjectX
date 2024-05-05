import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { GoogleAuthService } from "./services";
import { GoogleOauth2Strategy } from "./strategies/google-oauth2.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

// TODO: split auth module into 2 modules: auth and user
@Global()
@Module({
    imports: [
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
    providers: [AuthRepository, AuthService, GoogleAuthService, GoogleOauth2Strategy, JwtStrategy],
})
export class AuthModule {}
