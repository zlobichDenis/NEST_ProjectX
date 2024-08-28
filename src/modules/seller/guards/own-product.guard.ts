import { ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { SellerRepository } from "../seller.repository";
import { SellerProductRepository } from "../repositories/seller-product.repository";

@Injectable()
export class OwnProductGuard
{
    private readonly sellerRepository: SellerRepository;
    private readonly sellerProductRepository: SellerProductRepository;

    public constructor(private readonly moduleRef: ModuleRef)
    {
        this.sellerRepository = this.moduleRef.get(SellerRepository);
        this.sellerProductRepository = this.moduleRef.get(SellerProductRepository);
    }

    public async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();
        const { params } = request;

        const profile = request.profile?.user
            ? request.profile
            : await this.sellerRepository.getSellerByUserId(request.user.id);

        const sellerProduct = await this.sellerProductRepository.getSellerProductByProductId(params.productId);

        if (sellerProduct.sellerId !== profile.id)
        {
            throw new ForbiddenException();
        }

        return true;
    }
}
