import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UserService } from "src/modules/user";
import { TokenPayload } from "../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt")
{
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
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

    async validate(payload: TokenPayload)
    {
        return await this.userService.getUserById(payload.userId);
    }
}
