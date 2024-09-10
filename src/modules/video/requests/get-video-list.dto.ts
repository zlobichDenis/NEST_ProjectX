import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetVideoListQuery } from "../validation/get-video-list-query.schema";

export class GetVideoListDto
{
    @ApiPropertyOptional()
    public cursor?: string;

    @ApiPropertyOptional()
    public limit?: number;

    public constructor({ cursor, limit }: GetVideoListQuery)
    {
        this.cursor = cursor;
        this.limit = limit;
    }
}
