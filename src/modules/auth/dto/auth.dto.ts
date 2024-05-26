import { ApiProperty } from "@nestjs/swagger";
import { OriginProfile } from "../../../core";

//TODO: clean and remove unused code
export class LoginDto
{
    @ApiProperty()
    public email: string;

    public constructor(email: string)
    {
        this.email = email;
    }
}

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

export class RegisterDto extends OriginProfile {}

