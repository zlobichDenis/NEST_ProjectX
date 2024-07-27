import { ApiProperty } from "@nestjs/swagger";

export class AuthLinkResponse
{
    @ApiProperty()
    public authUrl: string;

    public constructor(link: string)
    {
        this.authUrl = link;
    }
}
