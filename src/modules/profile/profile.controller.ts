import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { JwtAuthGuard } from "../auth/guards";
import { RequestWithUser, ZodValidationPipe } from '../../core';
import { ProfileResponse } from "./reponses/profile.response";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { ProfileExistsGuard } from "./guards/profile-exists.guard";
import { OwnProfileGuard } from "./guards/own-profile.guard";
import { ProfileNotExistsGuard } from "./guards/profile-not-exists.buard";
import { CreateProfileBody, createProfileSchema } from './validation/create-profile.schema';

@ApiTags("profile")
@Controller("profile")
export class ProfileController
{
    public constructor(private readonly profileService: ProfileService) {}

    @ApiBearerAuth()
    @ApiResponse({ type: ProfileResponse })
    @ApiNotFoundResponse({ description: "Profile was not found" })
    @UseGuards(JwtAuthGuard, ProfileExistsGuard, OwnProfileGuard)
    @Get("/my")
    public async getProfileById(@Req() request: RequestWithUser): Promise<ProfileResponse>
    {
        return this.profileService.getProfileByUserId(request.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, ProfileNotExistsGuard)
    @UsePipes(new ZodValidationPipe(createProfileSchema))
    @Post("/my")
    public async createOwnProfile(
        @Req() request: RequestWithUser,
            @Body()
            createProfile: CreateProfileBody,
    ): Promise<ProfileResponse>
    {
        const createProfileDto = new CreateProfileDto(
            createProfile.userId,
            createProfile.familyName,
            createProfile.givenName,
            createProfile.photo,
            createProfile.description,
        );

        if (request.user.id !== createProfile.userId)
        {
            throw new BadRequestException();
        }

        return this.profileService.createUserProfile(createProfileDto);
    }
}
