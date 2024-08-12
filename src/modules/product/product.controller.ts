import {
    BadRequestException,
    Body,
    Controller,
    FileTypeValidator,
    Get, MaxFileSizeValidator, ParseFilePipe,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateProductBody, createProductSchema } from "./validation/create-product.schema";
import { CreateSellerProductDto } from "./requests/create-seller-product.dto";
import { CreateProductResponse } from "./responses/create-product.response";
import { RequestWithUser, ZodValidationPipe } from "../../core";
import { GetProductListQuery, getProductListQuerySchema } from "./validation/get-product-list-query.schema";
import { GetProductsQueryDto } from "./requests/get-products-query.dto";

@ApiTags("product")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("product")
export class ProductController
{
    public constructor(private readonly productService: ProductService) {}

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

        if (!files || !files.video[0] || !files.photos.length)
        {
            throw new BadRequestException();
        }

        return this.productService.createProduct(createProductDto, files.video[0], files.photos);
    }

    @ApiQuery({ type: GetProductsQueryDto })
    @Get("/list")
    public async getProducts(@Query(new ZodValidationPipe(getProductListQuerySchema)) query: GetProductListQuery)
    {
        return this.productService.getProductList(query);
    }
}
