import { Body, Controller, ForbiddenException, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { user_role as UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../auth/guards";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { OrderService } from "./order.service";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { CreateOrderBody, createOrderSchema } from "./validation/create-order.schema";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { ProfileRepository } from "../profile/profile.repository";
import { ProfileEntity } from "../profile/entities/profile.entity";
import { listOffsetSchema } from "../../core/validators/list-offset.schema";
import { ListOffset } from "../../core/abstract/list.response";

@ApiTags("order")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("order")
export class OrderController
{
    public constructor(
        private readonly orderService: OrderService,
        private readonly profileRepository: ProfileRepository
    ) {}

    @Roles(UserRole.CLIENT)
    @Post()
    public async createOrder(
    @Req() requestWithUser: RequestWithUser,
        @Body(new ZodValidationPipe(createOrderSchema)) createOrderBody: CreateOrderBody,
    )
    {
        const customerProfile = await this.getUsersProfile(requestWithUser.user.id);

        const createOrderDto = new CreateOrderDto(createOrderBody, customerProfile.id);

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

    private async getUsersProfile(userId: string): Promise<ProfileEntity>
    {
        const customerProfile = await this.profileRepository.getProfileByUserId(userId);

        if (!customerProfile) throw new ForbiddenException();

        return customerProfile;
    }
}
