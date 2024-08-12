import { ApiProperty } from "@nestjs/swagger";

export abstract class ListResponse
{
    @ApiProperty({ default: 0 })
    public offset: number = 0;

    @ApiProperty({ default: 20 })
    public limit: number = 20;

    @ApiProperty()
    public total: number;
}
