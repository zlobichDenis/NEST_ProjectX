import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { product_status as ProductStatus, region_key as RegionKey } from "@prisma/client";
import { CreateProductBody } from "../validation/create-product.schema";
import { VideoEntity } from "../../video/entities/video.entity";
import { ImageEntity } from "../../image/entities/image.entity";

export class CreateSellerProductDto
{
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

    // TODO: fow now only one region is supported
    @ApiHideProperty()
    public regionKey: RegionKey;

    public constructor({ name, description, status, tags, price }: CreateProductBody)
    {
        this.name = name;
        this.description = description;
        this.status = status;
        this.tags = tags;
        this.price = price;
        this.regionKey = RegionKey.RU;
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
