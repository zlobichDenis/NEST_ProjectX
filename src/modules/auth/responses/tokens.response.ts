import { ApiProperty } from "@nestjs/swagger";

export class TokensResponse
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
