import { ApiProperty } from "@nestjs/swagger";
import { PublicFileResponse } from "../../public-file/responses/public-file.response";
import { VideoEntity } from "../entities/video.entity";
import { ProductResponse } from "../../seller/responses/product.response";

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

    @ApiProperty()
    public product: ProductResponse;

    public constructor({ id, likesCount, name, fileId, file, createdAt, product }: VideoEntity)
    {
        this.id = id;
        this.file = new PublicFileResponse(file);
        this.likesCount = likesCount;
        this.name = name;
        this.fileId = fileId;
        this.createdAt = createdAt;
        this.product = product ? new ProductResponse(product) : undefined;
    }
}
