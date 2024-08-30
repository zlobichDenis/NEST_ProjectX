import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../types";
import { UserRepository } from "../../user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt")
{
    public constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
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
        return await this.userRepository.getUserById(payload.userId);
    }
}
