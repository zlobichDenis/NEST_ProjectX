import { user as UserBaseEntity, provider as AuthProvider, user_role as UserRole } from "@prisma/client";

export class UserEntity
{
    public id: string;
    public provider: AuthProvider;
    public createdAt: Date;
    public email: string;
    public refreshToken: string;
    public role: UserRole;

    public constructor(user: UserBaseEntity)
    {
        this.id = user.id;
        this.provider = user.provider;
        this.createdAt = user.created_at;
        this.email = user.email;
        this.refreshToken = user.current_refresh_token;
        this.role = user.role;
    }
}
