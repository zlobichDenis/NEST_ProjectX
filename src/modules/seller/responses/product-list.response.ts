import { ApiProperty } from "@nestjs/swagger";
import { ListCursorResponse } from "../../../core/abstract/list.response";
import { ProductResponse } from "./product.response";
import { ProductEntity } from "../../product/entites/product.entity";

export class ProductListResponse extends ListCursorResponse
{
    @ApiProperty({ type: ProductListResponse, isArray: true })
    public products: ProductResponse[];

    public constructor(entities: ProductEntity[], total: number)
    {
        super(total);
        this.products = entities.map((entity) => new ProductResponse(entity));
    }
}
