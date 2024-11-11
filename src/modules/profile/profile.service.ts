import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { ProfileResponse } from "./reponses/profile.response";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { ImageEntity } from "../image/entities/image.entity";
import { UploadImageDto } from "../image/requests/upload-image.dto";
import { ImageService } from "../image/image.service";
import { EventDispatcher } from "./events/event.dispatcher";
import { ProfileEntity } from "./entities/profile.entity";
import { CartRepository } from "../cart/cart.repository";

@Injectable()
export class ProfileService
{
    public constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly imageService: ImageService,
        private readonly eventDispatcher: EventDispatcher,
    ) {}

    public async getProfileByUserId(userId: string): Promise<ProfileResponse | null>
    {
        const profile = await this.profileRepository.getProfileByUserId(userId);

        return profile ? new ProfileResponse(profile) : null;
    }

    public async createUserProfile(
        createProfileDto: CreateProfileDto,
        avatar?: Express.Multer.File,
    ): Promise<ProfileResponse | null>
    {
        try {
            const profileAvatar = avatar ? await this.uploadAvatar(createProfileDto.id, avatar) : undefined;

            if (profileAvatar) createProfileDto.setAvatarImageId(profileAvatar.id);

            const profile = await this.profileRepository.createProfile(createProfileDto);

            if (!profile) return null;

            return new ProfileResponse(profile);
        } catch (err) {
            // TODO: replace with logger
            console.log(err);
            throw err;
        }
    }

    public async deleteUserProfileById(profileId: string): Promise<ProfileEntity>
    {
        const deletedProfile = await this.profileRepository.deleteProfileById(profileId);

        this.eventDispatcher.sendDeleteUserProfileEvent(deletedProfile);

        return deletedProfile;
    }

    private async uploadAvatar(profileId: string, avatar: Express.Multer.File): Promise<ImageEntity>
    {
        const uploadImageDto = new UploadImageDto(avatar);

        const [profileAvatar] = await this.imageService.createImages([uploadImageDto], profileId);

        return profileAvatar;
    }
}
