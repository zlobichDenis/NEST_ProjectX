import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user";
import { TokenPayload } from "../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt")
{
    public constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    )
    {
        super({
            // TODO: cookie, right now won't work cause for sending cookie
            //  from client cross origin request must be allowed,
            //  but for this same site property must be equal to none and secure property to true,
            //  but in this way https is required
            // jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) =>
            // {
            //     return request?.cookies?.Authentication;
            // },
            // ]),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET"),
        });
    }

    public async validate(payload: TokenPayload)
    {
        console.log(payload);
        return await this.userService.getUserById(payload.userId);
    }
}
