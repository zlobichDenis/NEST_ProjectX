import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TagEntity } from "../entites/tag.entity";

export class TagResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiPropertyOptional()
    public updatedAt?: Date;

    public constructor({ id, name, updatedAt, createdAt }: TagEntity)
    {
        this.id = id;
        this.name = name;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }
}
