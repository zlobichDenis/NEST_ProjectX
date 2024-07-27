import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { provider as AuthProvider } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user";
import { TokensResponse } from "./responses/tokens.response";
import { RegisterDto } from "./requests/register.request";
import { GoogleAuthService } from "./services";
import { CreateUserDto } from "../user/requests/create-user.dto";
import { AuthLinkResponse } from "./responses/oauth-link.response";
import { YandexAuthService } from "./services/yandex-auth.service";

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
        private readonly googleAuthService: GoogleAuthService,
        private readonly yandexAuthService: YandexAuthService,
    )
    {
        this.config = {
            jwtAccessSecret: this.configService.get("jwtSecret"),
            jwtRefreshSecret: this.configService.get("jwtRefreshSecret"),
            jwtAccessExpires: this.configService.get("jwtExpires"),
            jwtRefreshExpires: this.configService.get("jwtRefreshExpires"),
        };
    }

    public async loginViaProvider(dto: RegisterDto): Promise<TokensResponse>
    {
        switch (dto.provider)
        {
            case AuthProvider.GOOGLE:
                return this.loginViaGoogle(dto);

            case AuthProvider.YANDEX:
                return this.loginViaYandex(dto);
        }
    }

    public async getLoginLink(provider: AuthProvider): Promise<AuthLinkResponse>
    {
        let authUrl = "";

        switch (provider)
        {
            case AuthProvider.GOOGLE:
                authUrl = await this.googleAuthService.getAuthorizationUrl();
                break;
        }

        return new AuthLinkResponse(authUrl);
    }

    public async logOut(userId: string): Promise<void>
    {
        await this.userService.removeRefreshToken(userId);
    }

    public async generateJwtTokens(userId: string): Promise<TokensResponse>
    {
        const accessToken = await this.generateJwtAccessToken(userId);
        const refreshToken = await this.generateJwtRefreshToken(userId);

        await this.userService.setCurrentRefreshToken(refreshToken, userId);

        return new TokensResponse(accessToken, refreshToken);
    }

    public async generateJwtAccessToken(userId: string): Promise<string>
    {
        return this.jwtService.sign(
            { userId },
            { secret: this.config.jwtAccessSecret, expiresIn: this.config.jwtAccessExpires }
        );
    }

    public async createUser(provider: AuthProvider, email: string): Promise<TokensResponse>
    {
        const createdUser = await this.userService.createIfNotExists(new CreateUserDto(provider, email));

        if (!createdUser)
        {
            throw new BadRequestException("User already exists");
        }

        return this.generateJwtTokens(createdUser.id);
    }

    private async loginViaGoogle(dto: RegisterDto): Promise<TokensResponse>
    {
        const originalUser = await this.googleAuthService.validateToken(dto.tokenId);

        return this.loginViaEmail(dto.provider, originalUser.getPayload().email);
    }

    private async loginViaYandex(dto: RegisterDto): Promise<TokensResponse>
    {
        const userInfo = await this.yandexAuthService.getUserInfo(dto.tokenId);

        if (!userInfo)
        {
            throw new UnauthorizedException();
        }

        return this.loginViaEmail(dto.provider, userInfo.default_email);
    }

    private async loginViaEmail(provider: AuthProvider, email: string): Promise<TokensResponse>
    {
        const existingUser = await this.userService.getUserByEmail(email);

        if (!existingUser)
        {
            return this.createUser(provider, email);
        }

        return this.generateJwtTokens(existingUser.id);
    }

    private async generateJwtRefreshToken(userId: string): Promise<string>
    {
        return this.jwtService.sign(
            { userId },
            { secret: this.config.jwtRefreshSecret, expiresIn: this.config.jwtRefreshExpires }
        );
    }
}
