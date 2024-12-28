export class GetProfileAddressListDto
{
    public readonly cursor?: string;
    public readonly limit?: number;
    public readonly profileId?: string;

    public constructor({ cursor, limit, profileId }: { cursor?: string; limit?: number; profileId?: string })
    {
        this.cursor = cursor;
        this.profileId = profileId;
        this.limit = limit;
    }
}
