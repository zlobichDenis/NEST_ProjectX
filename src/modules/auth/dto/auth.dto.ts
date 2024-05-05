import { ApiProperty } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";

export class LoginDto
{
    email: string;
    provider: AuthProvider;
    originalId: string;
    familyName: string;
    givenName: string;
    photos: string[];

    constructor(
        email: string,
        provider: AuthProvider,
        originalId: string,
        familyName: string,
        givenName: string,
        photos: string[],
    )
    {
        this.email = email;
        this.provider = provider;
        this.originalId = originalId;
        this.familyName = familyName;
        this.givenName = givenName;
        this.photos = photos;
    }
}

export class LoginLinkResponse
{
    @ApiProperty({ description: "Google Authentication Url" })
    public auth_url: string;

    constructor(authUrl: string)
    {
        this.auth_url = authUrl;
    }
}

export class LoginResponse
{
    @ApiProperty({ description: "Access Token" })
    public access_token: string;

    @ApiProperty({ description: "Refresh Token" })
    public refresh_token: string;

    constructor(accessToken: string, refreshToken: string)
    {
        this.access_token = accessToken;
        this.refresh_token = refreshToken;
    }
}
