import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { SellerRepository } from "./seller.repository";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { CreateSellerResponse } from "./responses/create-seller.response";
import { SellerResponse } from "./responses/seller.response";
import { SellerEntity } from "./entities/seller.entity";
import { LoggerService } from "../../shared/logger";
import { LogoFileService } from "./services/logo-file.service";

@Injectable()
export class SellerService
{
    public constructor(
        private readonly sellerRepository: SellerRepository,
        private readonly loggerService: LoggerService,
        private readonly logoFileService: LogoFileService,
    ) {}

    public async createSeller(dto: CreateSellerDto): Promise<CreateSellerResponse>
    {
        try
        {
            const existingSeller  = await this.sellerRepository.getSellerByUserId(dto.userId);

            if (existingSeller)
            {
                throw new ForbiddenException("Seller is already exist");
            }

            const createdSeller = await this.sellerRepository.createSeller(dto);
            await this.logoFileService.uploadLogo(createdSeller.id, dto.logo);

            return new CreateSellerResponse(createdSeller);
        }
        catch (err)
        {
            this.loggerService.error(err);

            throw err;
        }
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
        try
        {
            const seller = await this.sellerRepository.getSellerByUserId(userId);

            if (!seller)
            {
                throw new NotFoundException("Seller was not found");
            }

            return new SellerResponse(seller);
        }
        catch (err)
        {
            this.loggerService.error(err);

            throw err;
        }
    }

    public async deleteSellerByUserId(userId: string): Promise<SellerEntity>
    {
        return this.sellerRepository.deleteSellerByUserId(userId);
    }
}
