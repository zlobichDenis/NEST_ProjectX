import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get, NotFoundException, Param,
    Post,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { user_role as UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../auth/guards";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { OrderService } from "./order.service";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { CreateOrderBody, createOrderSchema } from "./validation/create-order.schema";
import { CreateOrderDto } from "./requests/create-order.dto";
import { ProfileRepository } from "../profile/profile.repository";
import { ProfileEntity } from "../profile/entities/profile.entity";
import { ListOffsetQuery, listOffsetSchema } from "../../core/validators/list-offset.schema";
import { ListOffset } from "../../core/abstract/list.response";
import { ProfileAddressRepository } from "../profile/profile-addres/profile-address.repository";
import { OrderResponse } from "./responses/order.response";

@ApiTags("order")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("order")
export class OrderController
{
    public constructor(
        private readonly orderService: OrderService,
        private readonly profileRepository: ProfileRepository,
        private readonly profileAddressRepository: ProfileAddressRepository,
    ) {}

    @Roles(UserRole.CLIENT)
    @Post()
    public async createOrder(
    @Req() requestWithUser: RequestWithUser,
        @Body(new ZodValidationPipe(createOrderSchema)) body: CreateOrderBody,
    )
    {
        const customerProfile = await this.getUsersProfile(requestWithUser.user.id);

        if (!customerProfile)
        {
            throw new ForbiddenException();
        }

        if (!body.shippingAddress && !body.existingAddressId)
        {
            throw new BadRequestException("Provide shipping address");
        }

        if (body.existingAddressId)
        {
            const address = await this.profileAddressRepository.getProfileAddressByAddressId(body.existingAddressId);

            if (!address)
            {
                throw new BadRequestException("There is no address with such id");
            }

            if (address.profileId !== customerProfile.id)
            {
                throw new ForbiddenException();
            }
        }

        const createOrderDto = new CreateOrderDto(body, customerProfile.id);

        return this.orderService.createOrder(createOrderDto);
    }

    @Roles(UserRole.CLIENT)
    @Get("/list/own")
    public async getOwnOrderList(
    @Req() requestWithUser: RequestWithUser,
        @Query(new ZodValidationPipe(listOffsetSchema)) query: ListOffset,
    )
    {
        const customerProfile = await this.getUsersProfile(requestWithUser.user.id);

        return this.orderService.getOrderListByCustomerId(customerProfile.id, query);
    }

    @Roles(UserRole.CLIENT)
    @Get("/:orderId")
    public async getOrderDetails(
        @Req() requestWithUser: RequestWithUser,
            @Param("orderId") orderId: string,
    ): Promise<OrderResponse>
    {
        const customerProfile = await this.getUsersProfile(requestWithUser.user.id);
        const orderDetails = await this.orderService.getOrderById(orderId);

        if (!orderDetails)
        {
            throw new NotFoundException();
        }

        if (orderDetails.customerId !== customerProfile.id)
        {
            throw new ForbiddenException();
        }

        return orderDetails;
    }

    private async getUsersProfile(userId: string): Promise<ProfileEntity>
    {
        const customerProfile = await this.profileRepository.getProfileByUserId(userId);

        if (!customerProfile) throw new ForbiddenException();

        return customerProfile;
    }
}
