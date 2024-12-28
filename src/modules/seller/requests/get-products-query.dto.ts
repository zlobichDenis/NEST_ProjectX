import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { product_status as ProductStatus } from "@prisma/client";

export class GetProductsQueryDto
{
    @ApiProperty()
    public sellerId: string;

    @ApiPropertyOptional()
    public search?: string;

    @ApiPropertyOptional()
    public status?: ProductStatus;

    @ApiPropertyOptional()
    public from?: Date;

    @ApiPropertyOptional()
    public to?: Date;

    @ApiPropertyOptional()
    public cursor?: string;
}
