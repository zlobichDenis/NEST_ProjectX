import { ApiProperty } from "@nestjs/swagger";
import { ListResponse } from "../../../core/abstract/list.response";
import { OrderResponse } from "./order.response";
import { Dictionary } from "lodash";

export class OrderListResponse extends ListResponse
{
    @ApiProperty()
    public readonly items: Dictionary<OrderResponse>;

    public constructor(items: Dictionary<OrderResponse>, offset: number, limit: number, total: number)
    {
        super(offset, limit, total);
        this.items = items;
    }
}
