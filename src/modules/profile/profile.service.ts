import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { ProfileResponse } from "./reponses/profile.response";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { GetProfileOptions } from "./requests/get-profile-options.dto";

@Injectable()
export class ProfileService
{
    public constructor(private readonly profileRepository: ProfileRepository) {}

    public async getProfileByUserId(
        userId: string,
        options = new GetProfileOptions({ user: true }),
    ): Promise<ProfileResponse | null>
    {
        const profile = await this.profileRepository.getProfileByUserId(userId, options);

        return profile ? new ProfileResponse(profile) : null;
    }

    public async createUserProfile(createProfileDto: CreateProfileDto)
    {
        const profile = await this.profileRepository.createProfile(createProfileDto);

        return new ProfileResponse(profile);
    }
}
