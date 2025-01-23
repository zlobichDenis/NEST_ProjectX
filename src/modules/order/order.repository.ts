import { Injectable } from "@nestjs/common";
import { Dictionary, keyBy } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "../../shared/prisma-client";
import { CreateOrderDto } from "./requests/create-order.dto";
import { PrismaTransaction } from "../../shared/prisma-client/types";
import { OrderEntity, OrderListItem } from "./entities/order.entity";
import { ListOffset } from "../../core/abstract/list.response";
import { ProfileAddressRepository } from "../profile/profile-addres/profile-address.repository";
import { CreateProfileAddressDto } from "../profile/profile-addres/dto/create-profile-address.dto";
import { CreateAddressDto } from "../address/requests/create-address.dto";
import { CartItemProductEntity } from "../cart/entities/cart-item-product.entity";
import { ProductRepository } from "../product/product.repository";
import { AddressEntity } from "../address/entities/address.entity";

@Injectable()
export class OrderRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly profileAddressRepository: ProfileAddressRepository,
    ) {}

    public async createOrder(
        {
            customerId,
            paymentMethod,
            cartItemIds,
            shippingAddress,
            customerAddressId,
        }: CreateOrderDto,
        transaction?: PrismaTransaction
    ): Promise<OrderEntity[]>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const existingAddress = shippingAddress && !customerAddressId
                ? await this.profileAddressRepository.createProfileAddress(
                    new CreateProfileAddressDto(
                        customerId,
                        new CreateAddressDto(shippingAddress)
                    ),
                    transaction,
                )
                : null;

            const cartItems = await transaction.cart_item.findMany({ where: { id: { in: cartItemIds } } });

            if (!cartItems)
            {
                return null;
            }

            const orderGroupId = uuidv4();

            await Promise.all(cartItems.map((item) => transaction.order.create({
                data: {
                    id: uuidv4(),
                    group_id: orderGroupId,
                    customer_id: customerId,
                    cart_item_id: item.id,
                    payment_method: paymentMethod,
                    shipping_address_id: customerAddressId ? customerAddressId : existingAddress.address.id,
                },
            })));

            const orders = await transaction.order.findMany({ where: { cart_item_id: { in: cartItemIds } } });

            return orders.map((order) => new OrderEntity(order));
        });
    }

    public async getOrderListByCustomerId(customerId: string, params: ListOffset): Promise<Dictionary<OrderListItem>>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const orders = await transaction.order.findMany({
                where: { customer_id: customerId },
                include: {
                    shipping_address: { include: { address: true } },
                    cart_item: {
                        include:
                          {
                              product:
                                { include: {product_photos: { include: { photo: { include: { file: true } } } } } },
                          },
                    },
                },
                skip: params.offset,
                take: params.limit,
            });

            const total = await transaction.order.count({ where: { customer_id: customerId } });

            const orderListItems = orders.map((order) =>
            {
                const cartItemDetailedEntity = new CartItemProductEntity(
                    order.cart_item,
                    ProductRepository.transformProductEntity(order.cart_item.product)
                );
                const addressEntity = new AddressEntity(order.shipping_address.address);


                return new OrderListItem(order, cartItemDetailedEntity, addressEntity, total);
            });

            return keyBy(orderListItems, "groupId");
        });
    }

    public async getOrderDetailsById(id: string): Promise<OrderEntity>
    {
        const order = await this.prismaService.order.findUnique({
            where: { id },
            include: {
                shipping_address: { include: { address: true } },
                cart_item: {
                    include: {
                        product: {
                            include: {
                                product_photos: { include: { photo: { include: { file: true } } } },
                                product_videos: { include: { video: { include: { file: true } } } },
                                tags: { include: { tag: true } },
                            },
                        },
                    },
                },
            },
        });

        const productEntity = ProductRepository.transformProductEntity(order.cart_item.product);
        const cartItemEntity = new CartItemProductEntity(order.cart_item, productEntity);

        return new OrderEntity(order, cartItemEntity);
    }
}
