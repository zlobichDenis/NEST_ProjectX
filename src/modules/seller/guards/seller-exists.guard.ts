import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { SellerRepository } from "../seller.repository";

@Injectable()
export class SellerExistsGuard implements CanActivate
{
    private readonly sellerRepository: SellerRepository;

    public constructor(private readonly moduleRef: ModuleRef)
    {
        this.sellerRepository = this.moduleRef.get(SellerRepository);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const requestWithUser = context.switchToHttp().getRequest();

        const seller = await this.sellerRepository.getSellerByUserId(requestWithUser.user.id);

        if (!seller)
        {
            throw new NotFoundException("Profile was not found");
        }

        requestWithUser.profile = seller;

        return true;
    }
}
