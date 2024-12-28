import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { user_role as UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../../auth/guards";
import { CreateProductResponse } from "../responses/create-product.response";
import { CreateSellerProductDto } from "../requests/create-seller-product.dto";
import { RequestWithUser, ZodValidationPipe } from "../../../core";
import { CreateProductBody, createProductSchema } from "../validation/create-product.schema";
import { GetProductsQueryDto } from "../requests/get-products-query.dto";
import { GetProductListQuery, getProductListQuerySchema } from "../validation/get-product-list-query.schema";
import { SellerExistsGuard } from "../guards/seller-exists.guard";
import { SellerProductService } from "../services/seller-product.service";
import { OwnProductGuard } from "../guards/own-product.guard";
import { Roles } from "../../auth/decorators/role.decorator";
import { RolesGuard } from "../../auth/guards/role.guard";
import { FileValidator } from "../../../core/validators/file.validator";

@ApiTags("seller/product")
@ApiBearerAuth()
@Roles(UserRole.SELLER)
@UseGuards(JwtAuthGuard, SellerExistsGuard, RolesGuard)
@Controller("seller/product")
export class SellerProductController
{
    public constructor(private readonly sellerProductService: SellerProductService) {}

    @ApiCreatedResponse({ type: CreateProductResponse })
    @ApiBody({ type: CreateSellerProductDto })
    @UseInterceptors(FileFieldsInterceptor([
        { name: "video", maxCount: 1 },
        { name: "photos", maxCount: 5 },
    ]))
    @Post()
    public async createProduct(
        @Req()
            request: RequestWithUser,
            @Body(new ZodValidationPipe(createProductSchema))
            dto: CreateProductBody,
            @UploadedFiles()
            files: { video: Express.Multer.File[], photos: Express.Multer.File[] },
    ): Promise<CreateProductResponse>
    {
        const createProductDto = new CreateSellerProductDto(dto).setSellerUserId(request.user.id);

        if (
            !files
          || !files.video?.[0]
          || !files.photos?.length
          || !FileValidator.validateImages(files.photos)
          || !FileValidator.validateVideos(files.video)
        )
        {
            throw new BadRequestException();
        }

        return this.sellerProductService.createProduct(createProductDto, files.video[0], files.photos);
    }

    @ApiQuery({ type: GetProductsQueryDto })
    @Get("/list")
    public async getProducts(@Query(new ZodValidationPipe(getProductListQuerySchema)) query: GetProductListQuery)
    {
        return this.sellerProductService.getProductList(query);
    }

    @UseGuards(OwnProductGuard)
    @Delete(":productId")
    public async deleteProductById(@Param("productId") productId: string): Promise<HttpStatus.NO_CONTENT>
    {
        await this.sellerProductService.deleteProductById(productId);

        return HttpStatus.NO_CONTENT;
    }
}
