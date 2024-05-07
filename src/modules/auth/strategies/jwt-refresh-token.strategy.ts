import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UserService } from "src/modules/user";
import { TokenPayload } from "../types";

@Injectable()
export class JWTRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token")
{
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) =>
            {
                return request?.cookies?.Refresh;
            }]),
            secretOrKey: configService.get("jwtRefreshSecret"),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: TokenPayload): Promise<boolean>
    {
        const refreshToken = request.cookies?.Refresh;
        const user = await this.userService.getUserById(payload.userId);

        request.user = {
            id: payload.userId,
            email: user.email,
        };

        return Boolean(this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId));
    }
}
