import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "../../user/user.repository";
import { UserEntity } from "../../user/entities";

type LocalStrategyConfig = {
    password: string;
    email: string;
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local")
{
    private config: LocalStrategyConfig;

    public constructor(private readonly configService: ConfigService, private readonly userRepository: UserRepository)
    {
        super();

        this.config = {
            email: configService.get("basicUsername"),
            password: configService.get("basicPassword"),
        };
    }

    public async validate(username: string, password: string): Promise<UserEntity>
    {
        if (username !== this.config.email || password !== this.config.password)
        {
            throw new UnauthorizedException();
        }

        const user = await this.userRepository.getUserByEmail(username);

        if (!user)
        {
            throw new UnauthorizedException("Basic user doesn't exist");
        }

        return user;
    }
}
