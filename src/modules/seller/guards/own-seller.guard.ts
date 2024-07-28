import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { SellerRepository } from "../seller.repository";

@Injectable()
export class OwnSellerGuard implements CanActivate
{
    private readonly sellerRepository: SellerRepository;

    public constructor(private readonly moduleRef: ModuleRef)
    {
        this.sellerRepository = this.moduleRef.get(SellerRepository);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();

        const profile = request.profile?.user
          ? request.profile
          : await this.sellerRepository.getSellerByUserId(request.user.id);

        if (profile.user.id !== request.user.id)
        {
            throw new ForbiddenException("Forbidden request");
        }

        return true;
    }
}
