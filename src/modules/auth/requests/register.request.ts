import { ApiProperty } from "@nestjs/swagger";
import { provider as AuthProvider, user_role as UserRole } from "@prisma/client";
import { RegisterBody } from "../validation";

export class RegisterDto
{
    @ApiProperty({ enum: AuthProvider })
    public provider: AuthProvider;

    @ApiProperty()
    public tokenId: string;

    @ApiProperty()
    public role: UserRole;

    public constructor({ provider, tokenId, role }: RegisterBody)
    {
        this.provider = provider;
        this.tokenId = tokenId;
        this.role = role;
    }
}
