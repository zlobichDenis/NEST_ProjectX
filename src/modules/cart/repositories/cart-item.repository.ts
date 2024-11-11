import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../shared/prisma-client";
import { PrismaTransaction } from "../../../shared/prisma-client/types";
import { ProductRepository } from "../../product/product.repository";
import { CartItemProductEntity } from "../entities/cart-item-product.entity";
import { CartItemEntity } from "../entities/cart-item.entity";
import { CreateCartItemDto } from "../dtos/create-cart-items.dto";
import { UpdateCartItemDto } from "../dtos/update-cart-item.dto";

@Injectable()
export class CartItemRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async createCartItemsBatch(
        dtos: CreateCartItemDto[],
        transaction?: PrismaTransaction,
    ): Promise<CartItemEntity[]>
    {
        const client = transaction || this.prismaService;

        await client.cart_item.createMany({
            data:  dtos.map((item) => ({
                id: item.id,
                cart_id: item.cartId,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        });

        const cartItems = await client
            .cart_item
            .findMany({ where: { id: { in: dtos.map(({ id }) => id) } } });

        return cartItems.map((item) => new CartItemEntity(item));
    }

    public async getCartItemsByCartId(cartId: string, transaction?: PrismaTransaction): Promise<CartItemProductEntity[]>
    {
        const client = transaction || this.prismaService;

        const cartItems = await client.cart_item.findMany({
            where: { cart_id: cartId },
            include: {
                product: {
                    include: {
                        product_photos: { include: { photo: { include: { file: true } } } },
                        product_videos: { include: { video: { include: { file: true } } } },
                        tags: { include: { tag: true } },
                    },
                },
            },
        });

        return cartItems.map((item) =>
        {
            const cartItemProduct = ProductRepository.transformProductEntity(item.product);

            return new CartItemProductEntity(item, cartItemProduct);
        });
    }

    public async updateCartItem(dto: UpdateCartItemDto, transaction?: PrismaTransaction): Promise<CartItemEntity | null>
    {
        const client = transaction || this.prismaService;

        const cartItem = await client.cart_item.update({
            where: { id: dto.cartItemId },
            data: { quantity: dto.quantity },
        });

        return cartItem ? new CartItemEntity(cartItem) : null;
    }

    public async getCartItemById(id: string): Promise<CartItemEntity | null>
    {
        const cartItem = await this.prismaService.cart_item.findUnique({ where: { id } });

        return cartItem ? new CartItemEntity(cartItem) : null;
    }

    public async deleteCartItemById(id: string): Promise<CartItemEntity>
    {
        const cartEntity = await this.prismaService.cart_item.delete({ where: { id } });

        return new CartItemEntity(cartEntity);
    }
}
