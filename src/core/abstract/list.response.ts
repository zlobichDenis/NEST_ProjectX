import { ApiProperty } from "@nestjs/swagger";

export abstract class ListOffset
{
    @ApiProperty({ default: 0 })
    public offset: number = 0;

    @ApiProperty({ default: 20 })
    public limit: number = 20;

    public constructor(offset: number, limit: number)
    {
        this.offset = offset;
        this.limit = limit;
    }
}

export abstract class ListResponse extends ListOffset
{
    @ApiProperty()
    public total: number;

    public constructor(offset: number, limit: number, total: number)
    {
        super(offset, limit);
        this.total = total;
    }
}

