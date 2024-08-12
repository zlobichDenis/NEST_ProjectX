import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";
import { product_status as ProductStatus } from "@prisma/client";
import { CreateProductBody } from "../validation/create-product.schema";
import { VideoEntity } from "../../video/entities/video.entity";
import { ImageEntity } from "../../image/entities/image.entity";

export class CreateSellerProductDto
{
    public id: string;
    public sellerUserId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public price: number;

    @ApiProperty({ enum: ProductStatus })
    public status: ProductStatus;

    @ApiProperty()
    public tags: string[];

    @ApiProperty()
    public photos: ImageEntity[];

    public videoEntity: VideoEntity;

    @ApiPropertyOptional()
    public description?: string;

    public constructor({ name, description, status, tags, price }: CreateProductBody)
    {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.status = status;
        this.tags = tags;
        this.price = price;
    }

    public setVideoEntity(video: VideoEntity): CreateSellerProductDto
    {
        this.videoEntity = video;

        return this;
    }

    public setSellerUserId(sellerId: string): CreateSellerProductDto
    {
        this.sellerUserId = sellerId;

        return this;
    }

    public setPhotos(photos: ImageEntity[]): CreateSellerProductDto
    {
        this.photos = photos;

        return this;
    }
}
