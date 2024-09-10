import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export abstract class ListResponse
{
    @ApiProperty({ default: 0 })
    public offset: number = 0;

    @ApiProperty({ default: 20 })
    public limit: number = 20;

    @ApiProperty()
    public total: number;

    public constructor(offset: number, limit: number, total: number)
    {
        this.offset = offset;
        this.limit = limit;
        this.total = total;
    }
}

export abstract class ListCursorResponse
{
    @ApiProperty()
    public total: number;

    public constructor(total: number)
    {
        this.total = total;
    }
}
