import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get, HttpStatus,
    NotFoundException,
    Param,
    Post,
    Req,
    Patch,
    UseGuards,
} from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { CartService } from "./cart.service";
import { CartResponse } from "./responses/cart.response";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { user_role as UserRole } from "@prisma/client";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { ProfileRepository } from "../profile/profile.repository";
import { CartItemDto } from "./dtos/cart-item.dto";
import { CartItemResponse } from "./responses/cart-item.response";
import { AddItemsToCartDto } from "./dtos/add-items-to-cart.dto";
import { AddItemToCartBody, addItemToCartSchema } from "./validation/add-item-to-cart.schema";
import { CartRepository } from "./cart.repository";
import { CartItemRepository } from "./repositories/cart-item.repository";
import { UpdateCartItemBody, updateCartItemSchema } from "./validation/update-cart-item.schema";
import { UpdateCartItemDto } from "./dtos/update-cart-item.dto";

// TODO: move endpoint related to cartItem to separate controller
@ApiTags("cart")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CLIENT)
@Controller("cart")
export class CartController
{
    public constructor(
        private readonly cartService: CartService,
        private readonly profileRepository: ProfileRepository,
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
    )
    {
    }

    @Get("/own")
    public async getCart(@Req() requestWithUser: RequestWithUser): Promise<CartResponse>
    {
        const customersProfile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);

        return this.cartService.getCustomersCart(customersProfile.id);
    }

    @Post("/own/add")
    public async addItemToCart(
        @Req() requestWithUser: RequestWithUser,
            @Body(new ZodValidationPipe(addItemToCartSchema)) body: AddItemToCartBody
    ): Promise<CartItemResponse[]>
    {
        const customersProfile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);

        if (!customersProfile)
        {
            throw new ForbiddenException();
        }

        const cart = await this.cartRepository.getCartByCustomerId(customersProfile.id);

        if (!cart)
        {
            throw new NotFoundException();
        }

        const dto = new AddItemsToCartDto(
            cart.id,
            [new CartItemDto(uuid(), body.productId, body.amount)]
        );
        return this.cartService.addItemsToCart(dto);
    }

    @Patch("cartItem/:cartItemId")
    public async updateCartItem(
        @Req() requestWithUser: RequestWithUser,
            @Param("cartItemId") cartItemId: string,
            @Body(new ZodValidationPipe(updateCartItemSchema)) body: UpdateCartItemBody
    ): Promise<CartItemResponse>
    {
        const customersProfile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);
        if (!customersProfile) throw new ForbiddenException();

        const cartItem = await this.cartItemRepository.getCartItemById(cartItemId);
        if (!cartItem) throw new NotFoundException();

        return this.cartService.updateCartItem(new UpdateCartItemDto(cartItemId, body.amount));
    }

    @Delete("cartItem/:cartItemId")
    public async deleteCartItem(
        @Req() requestWithUser: RequestWithUser,
            @Param("cartItemId") cartItemId: string
    ): Promise<HttpStatus.NO_CONTENT>
    {
        const customersProfile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);
        if (!customersProfile) throw new ForbiddenException();

        const cart = await this.cartRepository.getCartByCustomerId(customersProfile.id);
        if (!cart) throw new NotFoundException();

        const cartItem = await this.cartItemRepository.getCartItemById(cartItemId);
        if (!cartItem) throw new NotFoundException();

        if (cartItem.cartId !== cart.id) throw new ForbiddenException();

        await this.cartService.deleteCartItemById(cartItemId);

        return HttpStatus.NO_CONTENT;
    }

    @Delete("/own")
    public async createOwnCart(@Req() requestWithUser: RequestWithUser): Promise<HttpStatus.NO_CONTENT>
    {
        const customersProfile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);
        if (!customersProfile) throw new ForbiddenException();

        const cart = await this.cartRepository.getCartByCustomerId(customersProfile.id);
        if (!cart) throw new NotFoundException();

        await this.cartService.deleteCartByCustomerId(cart.id);

        return HttpStatus.NO_CONTENT;
    }
}
