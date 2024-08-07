import { PassportStrategy } from "@nestjs/passport";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UserService } from "src/modules/user";
import { TokenPayload } from "../types";

@Injectable()
export class JWTRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token")
{
    public constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    )
    {
        super({
            // jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) =>
            // {
            //     return request?.cookies?.Refresh;
            // }]),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("jwtRefreshSecret"),
            passReqToCallback: true,
        });
    }

    public async validate(request: Request, payload: TokenPayload): Promise<boolean>
    {
        const refreshToken = request.get("Authorization").replace("Bearer", "");
        const user = await this.userService.getUserById(payload.userId);

        if (!user)
        {
            throw new NotFoundException("User was not found");
        }

        request.user = {
            id: payload.userId,
            email: user.email,
        };

        return Boolean(this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId));
    }
}
