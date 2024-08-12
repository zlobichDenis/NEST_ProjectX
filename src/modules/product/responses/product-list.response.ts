import { ApiProperty } from "@nestjs/swagger";
import { ListResponse } from "../../../core/abstract/list.response";
import { ProductResponse } from "./product.response";
import { ProductEntity } from "../entites/product.entity";

export class ProductListResponse extends ListResponse
{
    @ApiProperty({ type: ProductListResponse, isArray: true })
    public products: ProductResponse[];

    public constructor(entities: ProductEntity[], total: number, limit: number, offset: number)
    {
        super();
        this.products = entities.map((entity) => new ProductResponse(entity));
        this.limit = limit;
        this.offset = offset;
        this.total = total;
    }
}
