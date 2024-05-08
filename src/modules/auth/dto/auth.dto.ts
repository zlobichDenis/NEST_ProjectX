import { ApiProperty } from "@nestjs/swagger";

export class LoginLinkResponse
{
    @ApiProperty({ description: "Google Authentication Url" })
    public auth_url: string;

    public constructor(authUrl: string)
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

    public constructor(accessToken: string, refreshToken: string)
    {
        this.access_token = accessToken;
        this.refresh_token = refreshToken;
    }
}
