import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";
import { product_status as ProductStatus } from "@prisma/client";

export class CreateProductDto
{
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public price: number;

    @ApiProperty({ enum: ProductStatus })
    public status: ProductStatus;

    @ApiPropertyOptional()
    public description?: string;

    public constructor(name: string, description: string, status: ProductStatus, price: number)
    {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.status = status;
        this.price = price;
    }
}
