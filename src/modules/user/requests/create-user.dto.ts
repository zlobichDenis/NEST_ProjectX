import { provider as AuthProvider } from "@prisma/client";

export class CreateUserDto
{
    public provider: AuthProvider;
    public email: string;


    public constructor(provider: AuthProvider, email: string)
    {
        this.provider = provider;
        this.email = email;
    }
}
