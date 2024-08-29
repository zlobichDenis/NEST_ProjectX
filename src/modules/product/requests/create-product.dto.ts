import { v4 as uuid } from "uuid";
import { product_status as ProductStatus, region_key as RegionKey } from "@prisma/client";
import { ImageEntity } from "../../image/entities/image.entity";
import { VideoEntity } from "../../video/entities/video.entity";

export class CreateProductDto
{
    public id: string;
    public name: string;
    public price: number;
    public status: ProductStatus;
    public description?: string;
    public tags: string[];
    public photos: ImageEntity[];
    public regionKey: RegionKey;
    public video: VideoEntity;

    public constructor(
      name: string,
      description: string,
      status: ProductStatus,
      price: number,
      tags: string[],
      photos: ImageEntity[],
      regionKey: RegionKey,
      video: VideoEntity,
    )
    {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.status = status;
        this.price = price;
        this.tags = tags;
        this.photos = photos;
        this.regionKey = regionKey;
        this.video = video;
    }
}
