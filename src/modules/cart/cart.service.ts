import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { CartRepository } from "./cart.repository";
import { CartResponse } from "./responses/cart.response";
import { CreateCartDto } from "./dtos/create-cart.dto";
import { AddItemsToCartDto } from "./dtos/add-items-to-cart.dto";
import { CartItemRepository } from "./repositories/cart-item.repository";
import { CreateCartItemDto } from "./dtos/create-cart-items.dto";
import { CartItemResponse } from "./responses/cart-item.response";
import { CartDetailedResponse } from "./responses/cart-detailed.response";
import { UpdateCartItemDto } from "./dtos/update-cart-item.dto";

@Injectable()
export class CartService
{
    public constructor(
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
    ) {}

    public async createCart(dto: CreateCartDto): Promise<CartResponse>
    {
        const cartEntity = await this.cartRepository.createCart(dto);

        return new CartResponse(cartEntity.customerId, cartEntity.items);
    }

    public async addItemsToCart(dto: AddItemsToCartDto): Promise<CartItemResponse[]>
    {
        try
        {
            const createCartItemDtos = dto
                .items
                .map((item) => new CreateCartItemDto(uuid(), dto.cartId, item.productId, item.quantity));
            const cartItemEntities = await this.cartItemRepository.createCartItemsBatch(createCartItemDtos);

            return cartItemEntities.map((item) => new CartItemResponse(item));
        }
        catch (err)
        {
            // TODO: replace with logger
            console.log(err);
            throw err;
        }
    }

    public async updateCartItem(dto: UpdateCartItemDto): Promise<CartItemResponse | null>
    {
        const cartItemEntity = await this.cartItemRepository.updateCartItem(dto);

        return cartItemEntity ? new CartItemResponse(cartItemEntity) : null;
    }

    public async deleteCartItemById(id: string): Promise<void>
    {
        await this.cartItemRepository.deleteCartItemById(id);
    }

    public async getCustomersCart(customerId: string): Promise<CartResponse>
    {
        const cartEntity = await this.cartRepository.getDetailedCustomerCart(customerId);

        if (!cartEntity)
        {
            throw new NotFoundException("No Cart Found");
        }

        return new CartDetailedResponse(cartEntity.customerId, cartEntity.items);
    }

    public async deleteCartByCustomerId(cartId: string)
    {
        await this.cartRepository.clearCart(cartId);
    }
}
