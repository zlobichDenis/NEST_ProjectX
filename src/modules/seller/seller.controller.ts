import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SellerService } from "./seller.service";
import { CreateSellerBody, createSellerSchema } from "./validation/create-seller.validation";
import { JwtAuthGuard } from "../auth/guards";
import { CreateSellerResponse } from "./responses/create-seller.response";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { SellerResponse } from "./responses/seller.response";
import { SellerExistsGuard } from "./guards/seller-exists.guard";
import { OwnSellerGuard } from "./guards/own-seller.guard";

@ApiTags("seller")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("seller")
export class SellerController
{
    public constructor(private readonly sellerService: SellerService) {}

    @ApiCreatedResponse({ type: CreateSellerResponse })
    @ApiBody({ type: CreateSellerDto })
    @UseGuards(SellerExistsGuard)
    @Post("/my")
    public async createOwnSeller(
        @Req() request: RequestWithUser,
            @Body(new ZodValidationPipe(createSellerSchema)) dto: CreateSellerBody
    ): Promise<CreateSellerResponse>
    {
        const createSellerDto = new CreateSellerDto(dto).setUserId(request.user.id);

        return this.sellerService.createSeller(createSellerDto);
    }

    @ApiResponse({ type: SellerResponse })
    @UseGuards(SellerExistsGuard, OwnSellerGuard)
    @Get("/my")
    public async getOwnSeller(@Req() request: RequestWithUser): Promise<SellerResponse>
    {
        return this.sellerService.getSellerByUserId(request.user.id);
    }

    @ApiResponse({ type: SellerResponse })
    @ApiParam({ name: "id", type: String })
    @Get(":id")
    public async getSellerById(@Param("id") id: string): Promise<SellerResponse>
    {
        return this.sellerService.getSellerById(id);
    }
}
