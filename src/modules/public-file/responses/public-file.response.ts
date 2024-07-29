import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PublicFileEntity } from "../entities/public-file.entity";

export class PublicFileResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public key: string;

    @ApiProperty()
    public url: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiPropertyOptional()
    public updatedAt: Date;

    public constructor({ id, url, key, createdAt, updatedAt }: PublicFileEntity)
    {
        this.id = id;
        this.url = url;
        this.key = key;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
