import { ApiProperty } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";
import { RegisterBody } from "../validation";

export class RegisterDto
{
    @ApiProperty()
    public email: string;

    @ApiProperty({ enum: AuthProvider })
    public provider: AuthProvider;

    @ApiProperty()
    public originalId: string;

    public constructor({ originalId, provider, email }: RegisterBody)
    {
        this.email = email;
        this.provider = provider;
        this.originalId = originalId;
    }
}
