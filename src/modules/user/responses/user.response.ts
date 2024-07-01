import { ApiProperty } from "@nestjs/swagger";
import { provider as AuthProvider } from "@prisma/client";
import { UserEntity } from "../entities";

export class UserResponse
{
    @ApiProperty({ description: "Unique identified" })
    public id: string;

    @ApiProperty({ description: "Email which is unique for each user" })
    public email: string;

    @ApiProperty({ description: "Email which is unique for each user", enum: AuthProvider })
    public provider: AuthProvider;

    @ApiProperty({ description: "Date of creating" })
    public createdAt: Date;

    public constructor({ createdAt, provider, email, id }: UserEntity)
    {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
        this.provider = provider;
    }
}
