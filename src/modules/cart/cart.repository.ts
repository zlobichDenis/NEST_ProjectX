import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "../../shared/prisma-client";
import { CreateCartDto } from "./dtos/create-cart.dto";
import { CartEntity } from "./entities/cart.entity";
import { CartItemRepository } from "./repositories/cart-item.repository";
import { CartDetailedEntity } from "./entities/cart-detailed.entity";
import { PrismaTransaction } from "../../shared/prisma-client/types";

@Injectable()
export class CartRepository
{
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly cartItemRepository: CartItemRepository,
    ) {}

    public async createCart(dto: CreateCartDto, transaction?: PrismaTransaction): Promise<CartEntity>
    {
        if (transaction)
        {
            const createdCart = await transaction.cart.create({
                data: {
                    id: dto.id,
                    customer_id: dto.customerId,
                },
            });

            return new CartEntity(createdCart, []);
        }

        return this.prismaService.$transaction(async (db) =>
        {
            const createdCart = await db.cart.create({
                data: {
                    id: dto.id,
                    customer_id: dto.customerId,
                },
            });

            return new CartEntity(createdCart, []);
        });
    }

    public async getCartByCustomerId(customerId: string): Promise<CartEntity | null>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const cart = await transaction.cart.findUnique({ where: { customer_id: customerId } });

            if (!cart)
            {
                return null;
            }

            const cartItems = await this.cartItemRepository.getCartItemsByCartId(cart.id, transaction);

            return new CartEntity(cart, cartItems);
        });
    }

    public async getDetailedCustomerCart(customerId: string): Promise<CartDetailedEntity | null>
    {
        return this.prismaService.$transaction(async (transaction) =>
        {
            const customersCart = await transaction.cart.findUnique({ where: { customer_id: customerId } });
            const cartItems = await this.cartItemRepository.getCartItemsByCartId(customersCart.id, transaction);

            return customersCart ? new CartDetailedEntity(customersCart, cartItems) : null;
        });
    }

    public async clearCart(cartId: string, transaction?: PrismaTransaction): Promise<void>
    {
        const client = transaction || this.prismaService;

        await client.cart_item.deleteMany({ where: { cart_id: cartId } });
    }
}
