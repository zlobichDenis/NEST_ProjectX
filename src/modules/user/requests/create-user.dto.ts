import { provider as AuthProvider, user_role as UserRole } from "@prisma/client";

export class CreateUserDto
{
    public provider: AuthProvider;
    public email: string;
    public role: UserRole;

    public constructor(provider: AuthProvider, email: string, role: UserRole)
    {
        this.provider = provider;
        this.email = email;
        this.role = role;
    }
}
