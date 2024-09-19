import { moderation_status as ModerationStatus, product_status as ProductStatus } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProductEntity } from "../entites/product.entity";
import { TagResponse } from "../../tag/responses/tag.response";
import { ImageResponse } from "../../image/responses/image.response";
import { VideoResponse } from "../../video/responses/video.response";

export class ProductResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public price: number;

    @ApiProperty()
    public name: string;

    @ApiProperty({ enum: ModerationStatus })
    public moderationStatus: ModerationStatus;

    @ApiProperty({ enum: ProductStatus })
    public status: ProductStatus;

    @ApiProperty({ type: Date })
    public createdAt: Date;

    @ApiProperty({ type: VideoResponse, isArray: true })
    public videos: VideoResponse[];

    @ApiProperty({ type: ImageResponse, isArray: true })
    public images: ImageResponse[];

    @ApiProperty({ type: TagResponse, isArray: true })
    public tags: TagResponse[];

    @ApiPropertyOptional()
    public description?: string;

    @ApiPropertyOptional({ type: Date })
    public updatedAt?: Date;

    public constructor({
        id,
        name,
        price,
        tags,
        moderationStatus,
        status,
        createdAt,
        videos,
        images,
        description,
        updatedAt,
    }: ProductEntity)
    {
        this.id = id;
        this.name = name;
        this.price = price;
        this.tags = tags.map((tag) => new TagResponse(tag));
        this.moderationStatus = moderationStatus;
        this.status = status;
        this.createdAt = createdAt;
        this.videos = videos.map((video) => new VideoResponse(video));
        this.images = images.map((image) => new ImageResponse(image));
        this.description = description;
        this.updatedAt = updatedAt;
    }
}
