import { Body, Controller, Get, NotFoundException, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../auth/decorators/role.decorator";
import { user_role as UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../../auth/guards";
import { RolesGuard } from "../../auth/guards/role.guard";
import { ProfileAddressService } from "./profile-address.service";
import { RequestWithUser, ZodValidationPipe } from "../../../core";
import { ProfileRepository } from "../profile.repository";
import {
    GetProfileAdressesListQuery,
    getProfileAdressesListSchema,
} from "./validation/get-profile-adresses-list.schema";
import { GetProfileAddressListDto } from "./dto/get-profile-adress-list.dto";
import { ProfileAddressEntity } from "./entities/profile-address.entity";
import { CreateAddressBody, createAddressSchema } from "../../address/validation/create-address.schema";
import { CreateAddressDto } from "../../address/requests/create-address.dto";
import { ProfileEntity } from "../entities/profile.entity";
import { CreateProfileAddressDto } from "./dto/create-profile-address.dto";

@ApiBearerAuth()
@ApiTags("profile")
@Roles(UserRole.CLIENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("profile/address")
export class ProfileAddressController
{
    public constructor(
        private readonly profileAddressService: ProfileAddressService,
        private readonly profileRepository: ProfileRepository,
    ) {}

    @Get("/list/own")
    public async getOwnAdresses(
        @Req() requestWithUser: RequestWithUser,
            @Query(new ZodValidationPipe(getProfileAdressesListSchema)) query: GetProfileAdressesListQuery,
    ): Promise<ProfileAddressEntity[]>
    {
        const customerProfile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);

        if (!customerProfile)
        {
            throw new NotFoundException();
        }

        return this.profileAddressService.getProfileAdressList(new GetProfileAddressListDto({
            cursor: query.cursor,
            limit: query.limit,
            profileId: customerProfile.id,
        }));
    }

    @Post("/own")
    public async createOwnAddress(
        @Req() req: RequestWithUser,
            @Body(new ZodValidationPipe(createAddressSchema)) body: CreateAddressBody,
    ): Promise<ProfileAddressEntity>
    {
        const profile = await this.getProfileByUserId(req.user.id);

        const createAddressDto = new CreateAddressDto(body);
        const createProfileAddressDto = new CreateProfileAddressDto(profile.id, createAddressDto);

        return this.profileAddressService.createProfileAddress(createProfileAddressDto);
    }

    private async getProfileByUserId(userId: string): Promise<ProfileEntity>
    {
        const customerProfile = await this.profileRepository.getProfileByUserId(userId);

        if (!customerProfile)
        {
            throw new NotFoundException();
        }

        return customerProfile;
    }
}
