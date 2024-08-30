import { ApiProperty } from "@nestjs/swagger";
import { PublicFileResponse } from "../../public-file/responses/public-file.response";
import { VideoEntity } from "../entities/video.entity";

export class VideoResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public likesCount: number;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public fileId: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public file: PublicFileResponse;

    public constructor({ id, likesCount, name, fileId, file, createdAt }: VideoEntity)
    {
        this.id = id;
        this.file = new PublicFileResponse(file);
        this.likesCount = likesCount;
        this.name = name;
        this.fileId = fileId;
        this.createdAt = createdAt;
    }
}
