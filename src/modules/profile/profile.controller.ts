import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiResponse } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { JwtAuthGuard } from "../auth/guards";
import { RequestWithUser } from "../../core";
import { ProfileResponse } from "./reponses/profile.response";
import { CreateProfileDto } from "../user/requests/create-profile.dto";

@Controller("profile")
export class ProfileController
{
    public constructor(private readonly profileService: ProfileService) {}

    @ApiResponse({ type: ProfileResponse })
    @ApiNotFoundResponse({ description: "Profile was not found" })
    @UseGuards(JwtAuthGuard)
    @Get("/my")
    public async getProfileById(@Req() request: RequestWithUser): Promise<ProfileResponse>
    {
        return this.profileService.getProfileByUserId(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/my")
    public async createOwnProfile(@Req() request: RequestWithUser, @Body() createProfile: CreateProfileDto)
    {
        return this.profileService.createUserProfile(createProfile);
    }
}