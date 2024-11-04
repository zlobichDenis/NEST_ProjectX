import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { CreateOrderResponse } from "./responses/create-order.response";
import { ListOffset } from "../../core/abstract/list.response";
import { OrderListResponse } from "./responses/order-list.response";

@Injectable()
export class OrderService
{
    public constructor(private readonly orderRepository: OrderRepository) {}

    public async createOrder(dto: CreateOrderDto): Promise<CreateOrderResponse>
    {
        const createdOrder = await this.orderRepository.createOrder(dto);

        return createdOrder;
    }

    public async getOrderListByCustomerId(customerId: string, params: ListOffset): Promise<OrderListResponse>
    {
        const orders = await this.orderRepository.getOrderListByCustomerId(customerId, params);

        return new OrderListResponse(orders, params.offset, params.limit, orders[0]?.total || 0);
    }
}
