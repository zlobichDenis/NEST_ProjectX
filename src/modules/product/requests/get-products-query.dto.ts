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
    public createdAt?: Date;

    @ApiPropertyOptional()
    public limit?: number;

    @ApiPropertyOptional()
    public offset?: number;
}
