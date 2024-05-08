import { provider as AuthProvider } from "@prisma/client";

export class OriginProfile
{
    public email: string;
    public provider: AuthProvider;
    public originalId: string;
    public familyName: string;
    public givenName: string;
    public photos: string[];

    public constructor(
        email: string,
        provider: AuthProvider,
        originalId: string,
        familyName: string,
        givenName: string,
        photos: string[],
    )
    {
        this.email = email;
        this.provider = provider;
        this.originalId = originalId;
        this.familyName = familyName;
        this.givenName = givenName;
        this.photos = photos;
    }
}
