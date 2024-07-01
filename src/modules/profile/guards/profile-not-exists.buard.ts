import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ProfileRepository } from "../profile.repository";

@Injectable()
export class ProfileNotExistsGuard implements CanActivate
{
    private readonly profileRepository: ProfileRepository;

    public constructor(private readonly moduleRef: ModuleRef)
    {
        this.profileRepository = this.moduleRef.get(ProfileRepository);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const requestWithUser = context.switchToHttp().getRequest();

        const profile = await this.profileRepository.getProfileByUserId(requestWithUser.user.id);

        if (profile)
        {
            throw new BadRequestException("Profile is already exist");
        }

        requestWithUser.profile = profile;

        return true;
    }
}
