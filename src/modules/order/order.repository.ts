import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { OrderEntity, OrderListItem } from "./entities/order.entity";
import { ListOffset } from "../../core/abstract/list.response";

@Injectable()
export class OrderRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createOrder(
        {
            id,
            customerId,
            paymentMethod,
            productId,
            shippingAddress,
            amount,
        }: CreateOrderDto,
        transaction: PrismaTransaction = this.prismaService
    ): Promise<OrderEntity>
    {
        const createdOrder = await transaction.order.create({
            data: {
                id,
                customer_id: customerId,
                product_id: productId,
                payment_method: paymentMethod,
                shipping_address: shippingAddress,
                amount,
            },
        });

        return new OrderEntity(createdOrder);
    }

    public async getOrderListByCustomerId(customerId: string, params: ListOffset): Promise<OrderListItem[]>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const orders = await transaction.order.findMany({
                where: { customer_id: customerId },
                skip: params.offset,
                take: params.limit,
            });

            const total = await transaction.order.count({ where: { customer_id: customerId } });

            return orders.map((order) => new OrderListItem(order, total));
        });
    }
}
