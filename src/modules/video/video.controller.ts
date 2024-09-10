import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { VideoService } from "./video.service";
import { GetVideoListDto } from "./requests/get-video-list.dto";
import { GetVideoListQuery, getVideoListQuerySchema } from "./validation/get-video-list-query.schema";
import { ZodValidationPipe } from "../../core";

@ApiTags("video")
@Controller("video")
export class VideoController
{
    public constructor(private videoService: VideoService) {}

    @ApiQuery({ type: GetVideoListDto })
    @Get("/list")
    public async getVideoList(@Query(new ZodValidationPipe(getVideoListQuerySchema)) query: GetVideoListQuery)
    {
        const dto = new GetVideoListDto(query);

        return this.videoService.getVideoList(dto);
    }
}
