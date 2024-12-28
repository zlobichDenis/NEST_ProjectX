import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CreateOrderDto } from "./requests/create-order.dto";
import { CreateOrderResponse } from "./responses/create-order.response";
import { ListOffset } from "../../core/abstract/list.response";
import { OrderListResponse } from "./responses/order-list.response";
import { OrderResponse } from "./responses/order.response";

@Injectable()
export class OrderService
{
    public constructor(private readonly orderRepository: OrderRepository) {}

    public async createOrder(dto: CreateOrderDto): Promise<CreateOrderResponse[]>
    {
        const createdOrders = await this.orderRepository.createOrder(dto);

        if  (!createdOrders)
        {
            throw new BadRequestException();
        }

        return createdOrders.length ? createdOrders.map((order) => new CreateOrderResponse(order)) : [];
    }

    public async getOrderListByCustomerId(customerId: string, params: ListOffset): Promise<OrderListResponse>
    {
        const orders = await this.orderRepository.getOrderListByCustomerId(customerId, params);

        return new OrderListResponse(orders, params.offset, params.limit, orders[0]?.total || 0);
    }

    public async getOrderById(orderId: string): Promise<OrderResponse>
    {
        const order = await this.orderRepository.getOrderDetailsById(orderId);

        return order;
    }
}
