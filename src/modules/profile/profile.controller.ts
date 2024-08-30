import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { user_role as UserRole } from "@prisma/client";
import { ProfileService } from "./profile.service";
import { JwtAuthGuard } from "../auth/guards";
import { RequestWithProfile, RequestWithUser, ZodValidationPipe } from "../../core";
import { ProfileResponse } from "./reponses/profile.response";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { ProfileExistsGuard } from "./guards/profile-exists.guard";
import { OwnProfileGuard } from "./guards/own-profile.guard";
import { ProfileNotExistsGuard } from "./guards/profile-not-exist.guard";
import { CreateProfileBody, createProfileSchema } from "./validation/create-profile.schema";
import { Roles } from "../auth/decorators/role.decorator";
import { RolesGuard } from "../auth/guards/role.guard";

@ApiBearerAuth()
@ApiTags("profile")
@Roles(UserRole.CLIENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("profile")
export class ProfileController
{
    public constructor(private readonly profileService: ProfileService) {}

    @ApiResponse({ type: ProfileResponse })
    @ApiNotFoundResponse({ description: "Profile was not found" })
    @UseGuards(ProfileExistsGuard, OwnProfileGuard)
    @Get("/my")
    public async getProfileById(@Req() request: RequestWithUser): Promise<ProfileResponse>
    {
        return this.profileService.getProfileByUserId(request.user.id);
    }

    @ApiBody({ type: CreateProfileDto })
    @UseInterceptors(FileInterceptor("avatar"))
    @UseGuards(JwtAuthGuard, ProfileNotExistsGuard)
    @Post("/my")
    public async createOwnProfile(
        @Req() request: RequestWithUser,
            @Body(new ZodValidationPipe(createProfileSchema))
            createProfile: CreateProfileBody,
            @UploadedFile(new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2e+7 }),
                    new FileTypeValidator({ fileType: "image/jpeg" }),
                    new FileTypeValidator({ fileType: "image/png" }),
                ],
            }))
            avatar?: Express.Multer.File,
    ): Promise<ProfileResponse>
    {
        const createProfileDto = new CreateProfileDto(
            request.user.id,
            createProfile.name,
        );

        return this.profileService.createUserProfile(createProfileDto, avatar);
    }

    @UseGuards(ProfileExistsGuard, OwnProfileGuard)
    @Delete("/own")
    public async deleteOwnProfile(@Req() request: RequestWithProfile): Promise<HttpStatus.NO_CONTENT>
    {
        await this.profileService.deleteUserProfileById(request.profile.id);

        return HttpStatus.NO_CONTENT;
    }
}
