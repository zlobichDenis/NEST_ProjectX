import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { JwtAuthGuard } from "../auth/guards";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { ProfileResponse } from "./reponses/profile.response";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { ProfileExistsGuard } from "./guards/profile-exists.guard";
import { OwnProfileGuard } from "./guards/own-profile.guard";
import { ProfileNotExistsGuard } from "./guards/profile-not-exist.guard";
import { CreateProfileBody, createProfileSchema } from "./validation/create-profile.schema";

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
    @ApiBody({ type: CreateProfileDto })
    @Post("/my")
    public async createOwnProfile(
        @Req() request: RequestWithUser,
            @Body(new ZodValidationPipe(createProfileSchema))
            createProfile: CreateProfileBody,
    ): Promise<ProfileResponse>
    {
        const createProfileDto = new CreateProfileDto(
            request.user.id,
            createProfile.name,
        );

        return this.profileService.createUserProfile(createProfileDto);
    }
}
