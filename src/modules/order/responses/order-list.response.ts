import { ApiProperty } from "@nestjs/swagger";
import { ListResponse } from "../../../core/abstract/list.response";
import { OrderResponse } from "./order.response";

export class OrderListResponse extends ListResponse
{
    @ApiProperty()
    public readonly items: OrderResponse[];

    public constructor(items: OrderResponse[], offset: number, limit: number, total: number)
    {
        super(offset, limit, total);
        this.items = items;
    }
}
