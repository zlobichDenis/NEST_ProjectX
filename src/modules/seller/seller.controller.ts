import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { user_role as UserRole } from "@prisma/client";
import { SellerService } from "./seller.service";
import { CreateSellerBody, createSellerSchema } from "./validation/create-seller.validation";
import { JwtAuthGuard } from "../auth/guards";
import { CreateSellerResponse } from "./responses/create-seller.response";
import { CreateSellerDto } from "./requests/create-seller.dto";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { SellerResponse } from "./responses/seller.response";
import { SellerExistsGuard } from "./guards/seller-exists.guard";
import { OwnSellerGuard } from "./guards/own-seller.guard";
import { Roles } from "../auth/decorators/role.decorator";
import { RolesGuard } from "../auth/guards/role.guard";
import { FileValidator } from "../../core/validators/file.validator";

@ApiTags("seller")
@ApiBearerAuth()
@Roles(UserRole.SELLER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("seller")
export class SellerController
{
    public constructor(private readonly sellerService: SellerService) {}

    @ApiCreatedResponse({ type: CreateSellerResponse })
    @ApiBody({ type: CreateSellerDto })
    @UseInterceptors(FileInterceptor("logo"))
    @Post("/my")
    public async createOwnSeller(
        @Req() request: RequestWithUser,
            @Body(new ZodValidationPipe(createSellerSchema)) dto: CreateSellerBody,
            @UploadedFile() logo?: Express.Multer.File,
    ): Promise<CreateSellerResponse>
    {
        if (logo)
        {
            if (!FileValidator.validateImages([logo]))
            {
                throw new BadRequestException();
            }
        }

        const createSellerDto = new CreateSellerDto(dto)
            .setUserId(request.user.id)
            .setLogo(logo);

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

    @ApiNoContentResponse()
    @UseGuards(SellerExistsGuard, OwnSellerGuard)
    @Delete("/my")
    public async deleteOwn(@Req() request: RequestWithUser, @Res() response: Response): Promise<Response>
    {
        await this.sellerService.deleteSellerByUserId(request.user.id);

        return response.sendStatus(HttpStatus.NO_CONTENT);
    }
}
