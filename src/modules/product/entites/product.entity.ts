import {
    product as ProductBaseEntity,
    moderation_status as ModerationStatus,
    product_status as ProductStatus,
} from "@prisma/client";
import { PublicFileEntity } from "../../public-file/entities/public-file.entity";
import { TagEntity } from "../../tag/entites/tag.entity";

export class ProductEntity
{
    public id: string;
    public price: number;
    public name: string;
    public moderationStatus: ModerationStatus;
    public status: ProductStatus;
    public createdAt: Date;


    public total?: number;
    public description?: string;
    public updatedAt?: Date;
    public videos?: PublicFileEntity[];
    public images?: PublicFileEntity[];
    public tags?: TagEntity[];

    public constructor({
        id,
        price,
        moderation_status,
        status,
        description,
        created_at,
        updated_at,
        name,
    }: ProductBaseEntity)
    {
        this.id = id;
        this.price = price;
        this.moderationStatus = moderation_status;
        this.status = status;
        this.description = description;
        this.createdAt = new Date(created_at);
        this.updatedAt = updated_at ? new Date(updated_at) : null;
        this.name = name;
    }

    public setVideos(videos: PublicFileEntity[]): ProductEntity
    {
        this.videos = videos;

        return this;
    }

    public setImages(images: PublicFileEntity[]): ProductEntity
    {
        this.images = images;

        return this;
    }

    public setTags(tags: TagEntity[]): ProductEntity
    {
        this.tags = tags;

        return this;
    }

    public setTotal(total: number): ProductEntity
    {
        this.total = total;

        return this;
    }
}
