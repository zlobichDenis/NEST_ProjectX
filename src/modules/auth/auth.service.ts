import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { provider as AuthProvider } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user";
import { LoginDto, LoginLinkResponse, LoginResponse } from "./dto";
import { GoogleAuthService } from "./services";

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

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly googleAuthService: GoogleAuthService,
    )
    {
        this.config = {
            jwtAccessSecret: this.configService.get("jwtSecret"),
            jwtRefreshSecret: this.configService.get("jwtRefreshSecret"),
            jwtAccessExpires: this.configService.get("jwtExpires"),
            jwtRefreshExpires: this.configService.get("jwtRefreshExpires"),
        };
    }

    public async getLoginLink(provider: AuthProvider): Promise<LoginLinkResponse>
    {
        let authUrl = "";

        switch (provider)
        {
            case AuthProvider.GOOGLE:
                authUrl = await this.googleAuthService.getAuthorizationUrl();
                break;
        }

        return new LoginLinkResponse(authUrl);
    }

    public async loginOAuth(dto: LoginDto): Promise<LoginResponse>
    {
        try
        {
            const existingUser = await this.userService.getUserByEmail(dto.email);

            return this.generateJwtTokens(existingUser.id);
        }
        catch(err)
        {
            const createdUser = await this.userService.createUserWithProfile(dto);

            return this.generateJwtTokens(createdUser.id);
        }
    }

    public async logOut(userId: string): Promise<void>
    {
        await this.userService.removeRefreshToken(userId);
    }

    private async generateJwtTokens(userId: string): Promise<LoginResponse>
    {
        const accessToken = this.generateJwtAccessToken(userId);
        const refreshToken = this.generateJwtRefreshToken(userId);

        await this.userService.setCurrentRefreshToken(refreshToken, userId);

        return new LoginResponse(accessToken, refreshToken);
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
