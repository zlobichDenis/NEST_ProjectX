import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ProfileRepository } from "../profile.repository";

@Injectable()
export class OwnProfileGuard implements CanActivate
{
    private readonly profileRepository: ProfileRepository;

    public constructor(private readonly moduleRef: ModuleRef)
    {
        this.profileRepository = this.moduleRef.get(ProfileRepository);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();

        const profile = request.profile?.user
            ? request.profile
            : await this.profileRepository.getProfileByUserId(request.user.id, { include: { user: true } });

        if (profile.user.id !== request.user.id)
        {
            throw new ForbiddenException("Forbidden request");
        }

        return true;
    }
}
