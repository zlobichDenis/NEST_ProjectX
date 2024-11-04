import { VideoResponse } from "./video.response";
import { ApiProperty } from "@nestjs/swagger";
import { VideoEntity } from "../entities/video.entity";
import { ListCursorResponse } from "../../../core/abstract/list-cursor";

export class VideoListResponse extends ListCursorResponse
{
    @ApiProperty({ type: VideoResponse, isArray: true })
    public videos: VideoResponse[];

    public constructor(videos: VideoEntity[], total: number)
    {
        super(total);

        this.videos = videos.map((video) => new VideoResponse(video));
    }
}
