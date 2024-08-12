import { moderation_status as ModerationStatus, product_status as ProductStatus } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PublicFileResponse } from "../../public-file/responses/public-file.response";
import { TagResponse } from "../../tag/responses/tag.response";
import { ProductEntity } from "../entites/product.entity";

export class ProductResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public price: number;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public moderationStatus: ModerationStatus;

    @ApiProperty()
    public status: ProductStatus;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public description?: string;

    @ApiPropertyOptional()
    public updatedAt?: Date;

    @ApiPropertyOptional({ type: PublicFileResponse, isArray: true })
    public videos?: PublicFileResponse[];

    @ApiPropertyOptional({ type: PublicFileResponse, isArray: true })
    public images?: PublicFileResponse[];

    @ApiPropertyOptional({ type: PublicFileResponse, isArray: true })
    public tags?: TagResponse[];

    public constructor({
        id,
        price,
        moderationStatus,
        status,
        description,
        createdAt,
        updatedAt,
        name,
        videos,
        images,
        tags,
    }: ProductEntity)
    {
        this.id = id;
        this.price = price;
        this.moderationStatus = moderationStatus;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
        this.tags = tags?.map((tag) => new TagResponse(tag));
        this.images = images?.map((image) => new PublicFileResponse(image));
        this.videos = videos?.map((video) => new PublicFileResponse(video));
    }
}
