import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { SellerRepository } from "./seller.repository";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { CreateSellerResponse } from "./responses/create-seller.response";
import { SellerResponse } from "./responses/seller.response";

@Injectable()
export class SellerService
{
    public constructor(private readonly sellerRepository: SellerRepository) {}

    public async createSeller(dto: CreateSellerDto): Promise<CreateSellerResponse>
    {
        const existingSeller  = await this.sellerRepository.getSellerByUserId(dto.userId);

        if (existingSeller)
        {
            throw new ForbiddenException("Seller is already exist");
        }

        const createdSeller = await this.sellerRepository.createSeller(dto);

        return new CreateSellerResponse(createdSeller);
    }

    public async getSellerById(id: string): Promise<SellerResponse>
    {
        const seller = await this.sellerRepository.getSellerById(id);

        if (!seller)
        {
            throw new NotFoundException("Seller was not found");
        }

        return new SellerResponse(seller);
    }

    public async getSellerByUserId(userId: string): Promise<SellerResponse>
    {
        const seller = await this.sellerRepository.getSellerByUserId(userId);

        if (!seller)
        {
            throw new NotFoundException("Seller was not found");
        }

        return new SellerResponse(seller);
    }
}
