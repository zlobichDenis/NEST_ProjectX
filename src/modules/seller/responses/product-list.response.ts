import { ApiProperty } from "@nestjs/swagger";
import { ProductResponse } from "./product.response";
import { ProductEntity } from "../../product/entites/product.entity";
import { ListCursorResponse } from "../../../core/abstract/list-cursor";

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
