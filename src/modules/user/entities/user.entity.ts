import { user as UserBaseEntity, profile as ProfileBaseEntity, provider as AuthProvider } from "@prisma/client";

export class UserEntity
{
    public id: string;
    public provider: AuthProvider;
    public originalId: string;
    public createdAt: Date;
    public email: string;
    public profile: ProfileBaseEntity;
    public refreshToken: string;

    constructor(user: UserBaseEntity)
    {
        this.id = user.id;
        this.provider = user.provider;
        this.originalId = user.original_id;
        this.createdAt = user.created_at;
        this.email = user.email;
        this.refreshToken = user.current_refresh_token;
    }

    public setProfile(profile: ProfileBaseEntity)
    {
        this.profile = profile;

        return this;
    }
}