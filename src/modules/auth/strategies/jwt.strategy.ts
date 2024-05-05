import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AuthRepository } from "../auth.repository";
import { TokenPayload } from "../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt")
{
    constructor(
        private readonly configService: ConfigService,
        private readonly authRepository: AuthRepository,
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) =>
            {
                return request?.cookies?.Authentication;
            },
            ]),
            secretOrKey: configService.get("JWT_SECRET"),
        });
    }

    async validate(payload: TokenPayload): Promise<boolean>
    {
        return Boolean(await this.authRepository.getUserById(payload.userId));
    }
}
