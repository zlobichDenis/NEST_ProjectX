import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user";
import { TokensResponse, RegisterDto } from "./dto";

type AuthServiceConfig = {
    jwtAccessSecret: string;
    jwtRefreshSecret: string;
    jwtAccessExpires: string;
    jwtRefreshExpires: string;
};

@Injectable()
export class AuthService
{
    private config: AuthServiceConfig;

    public constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    )
    {
        this.config = {
            jwtAccessSecret: this.configService.get("jwtSecret"),
            jwtRefreshSecret: this.configService.get("jwtRefreshSecret"),
            jwtAccessExpires: this.configService.get("jwtExpires"),
            jwtRefreshExpires: this.configService.get("jwtRefreshExpires"),
        };
    }

    public async login(dto: RegisterDto): Promise<TokensResponse>
    {
        try
        {
            const existingUser = await this.userService.getUserByEmail(dto.email);

            return this.generateJwtTokens(existingUser.id);
        }
        catch (err)
        {
            if (err instanceof NotFoundException)
            {
                const createdUser = await this.userService.createIfNotExists(dto);

                if (!createdUser)
                {
                    throw new BadRequestException("User already exists");
                }

                return this.generateJwtTokens(createdUser.id);
            }

            throw err;
        }
    }

    public async logOut(userId: string): Promise<void>
    {
        await this.userService.removeRefreshToken(userId);
    }

    private async generateJwtTokens(userId: string): Promise<TokensResponse>
    {
        const accessToken = this.generateJwtAccessToken(userId);
        const refreshToken = this.generateJwtRefreshToken(userId);

        await this.userService.setCurrentRefreshToken(refreshToken, userId);

        return new TokensResponse(accessToken, refreshToken);
    }

    public generateJwtAccessToken(userId: string): string
    {
        return this.jwtService.sign(
            { userId },
            { secret: this.config.jwtAccessSecret, expiresIn: this.config.jwtAccessExpires }
        );
    }

    private generateJwtRefreshToken(userId: string): string
    {
        return this.jwtService.sign(
            { userId },
            { secret: this.config.jwtRefreshSecret, expiresIn: this.config.jwtRefreshExpires }
        );
    }
}
