import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { moderation_status as ModerationStatus, product_status as ProductStatus } from "@prisma/client";
import { ProductEntity } from "../../product/entites/product.entity";
import { TagEntity } from "../../tag/entites/tag.entity";

export class CreateProductResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public price: number;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public moderationStatus: ModerationStatus;

    @ApiProperty()
    public status: ProductStatus;

    @ApiProperty()
    public name: string;

    @ApiPropertyOptional()
    public description?: string;

    @ApiPropertyOptional()
    public tags: TagEntity[];

    @ApiPropertyOptional()
    public updatedAt?: Date;

    public constructor({ id, price, createdAt, description, moderationStatus, name, status, updatedAt }: ProductEntity)
    {
        this.id = id;
        this.price = price;
        this.description = description;
        this.moderationStatus = moderationStatus;
        this.createdAt = createdAt;
        this.name = name;
        this.status = status;
        this.updatedAt = updatedAt;
    }
}
