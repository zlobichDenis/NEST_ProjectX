import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { ProfileEntity } from "./entities/profile.entity";
import { CreateProfileDto } from "./requests/create-profile.dto";
import { GetProfileOptions } from "./requests/get-profile-options.dto";

@Injectable()
export class ProfileRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async getProfileById(profileId: string, options?: GetProfileOptions): Promise<ProfileEntity | null>
    {
        const profile = await this.prismaService.profile.findUnique({
            where: { id: profileId },
            include: options?.include,
        });

        return profile ? new ProfileEntity(profile) : null;
    }

    public async getProfileByUserId(userId: string, options?: GetProfileOptions): Promise<ProfileEntity | null>
    {
        const profile = await this.prismaService.profile.findUnique({
            where: { user_id: userId },
            include: options?.include,
        });

        return profile ? new ProfileEntity(profile).setUser(profile.user) : null;
    }

    public async createProfile({
        id,
        familyName,
        givenName,
        photo,
        description,
        userId,
    }: CreateProfileDto): Promise<ProfileEntity | null>
    {
        const profile = await this.prismaService.profile.create({
            data: {
                id,
                family_name: familyName,
                given_name: givenName,
                photo,
                description,
                user_id: userId,
            },
        });

        return profile ? new ProfileEntity(profile) : null;
    }
}
