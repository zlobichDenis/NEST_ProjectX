import { ApiProperty } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";
import { RegisterBody } from "../validation";

export class RegisterDto
{
    @ApiProperty({ enum: AuthProvider })
    public provider: AuthProvider;

    @ApiProperty()
    public tokenId: string;

    public constructor({ provider, tokenId }: RegisterBody)
    {
        this.provider = provider;
        this.tokenId = tokenId;
    }
}
