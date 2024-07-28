import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { provider as AuthProvider } from "@prisma/client";

type GoogleProfile = {
    id: string;
    displayName: string;
    name: { familyName: string, givenName: string };
    emails: { value: string, verified: boolean }[];
    photos: { value: string }[];
    provider: "google";
};

@Injectable()
export class GoogleOauth2Strategy extends PassportStrategy(Strategy, "google")
{
    public constructor(private readonly configService: ConfigService)
    {
        super({
            clientID: configService.get("googleClientId"),
            clientSecret: configService.get("googleClientSecret"),
            callbackURL: configService.get("googleRedirectUrl"),
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "openid",
            ],
        });
    }

    private async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: GoogleProfile,
        done: VerifyCallback,
    ): Promise<void>
    {
        const { id, name, emails, photos } = profile;

        const user = {
            email: emails[0].value,
            provider: AuthProvider.GOOGLE,
            originalId: id,
            familyName: name.familyName,
            name: name.givenName,
            photos: photos.map(({ value }) => value),
        };

        done(null, user);
    }
}
