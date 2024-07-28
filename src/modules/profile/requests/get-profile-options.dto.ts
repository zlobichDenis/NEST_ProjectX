export class GetProfileOptions
{
    public readonly include: { user: boolean };

    public constructor(include: { user: boolean })
    {
        this.include = include;
    }
}
