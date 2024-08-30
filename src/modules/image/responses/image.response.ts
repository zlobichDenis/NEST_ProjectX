import { ApiProperty } from "@nestjs/swagger";
import { PublicFileResponse } from "../../public-file/responses/public-file.response";
import { ImageEntity } from "../entities/image.entity";

export class ImageResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public fileId: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public file: PublicFileResponse;

    public constructor({ id, file, fileId, createdAt }: ImageEntity)
    {
        this.id = id;
        this.fileId = fileId;
        this.createdAt = createdAt;
        this.file = new PublicFileResponse(file);
    }
}
