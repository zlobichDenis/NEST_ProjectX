import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma-client";
import { ProfileEntity } from "./entities/profile.entity";
import { CreateProfileDto } from "../user/requests/create-profile.dto";

@Injectable()
export class ProfileRepository
{
    public constructor(private readonly prismaService: PrismaService) {}

    public async getProfileById(profileId: string): Promise<ProfileEntity | null>
    {
        const profile = await this.prismaService.profile.findUnique({ where: { id: profileId } });

        return profile ? new ProfileEntity(profile) : null;
    }

    public async getProfileByUserId(userId: string): Promise<ProfileEntity | null>
    {
        const profile = await this.prismaService.profile.findUnique({ where: { user_id: userId } });

        return profile ? new ProfileEntity(profile) : null;
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