import { provider as AuthProvider } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class OriginProfile
{
    @ApiProperty()
    public email: string;

    @ApiProperty({ enum: AuthProvider })
    public provider: AuthProvider;

    @ApiProperty()
    public originalId: string;

    @ApiProperty()
    public familyName?: string;

    @ApiProperty()
    public givenName?: string;

    @ApiProperty()
    public photos?: string[];

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
