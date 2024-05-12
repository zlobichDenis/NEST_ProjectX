import { Injectable } from "@nestjs/common";
import { google, Auth } from "googleapis";
import { ConfigService } from "@nestjs/config";

type GoogleAuthServiceConfig = {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scope: string[];
};

@Injectable()
export class GoogleAuthService
{
    private googleAuthClient: Auth.OAuth2Client;
    private config: GoogleAuthServiceConfig;

    public constructor(private readonly configService: ConfigService)
    {
        this.config = {
            clientId: this.configService.get("googleClientId"),
            clientSecret: this.configService.get("googleClientSecret"),
            redirectUri: this.configService.get("googleRedirectUrl"),
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "openid",
            ],
        };

        this.googleAuthClient = new google.auth.OAuth2(
            this.config.clientId,
            this.config.clientSecret,
            this.config.redirectUri,
        );
    }

    public async getAuthorizationUrl(): Promise<string>
    {
        return this.googleAuthClient.generateAuthUrl({ scope: this.config.scope });
    }
}
