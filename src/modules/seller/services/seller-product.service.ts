import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ImageService } from "../../image/image.service";
import { VideoService } from "../../video/video.service";
import { SellerRepository } from "../seller.repository";
import { CreateSellerProductDto } from "../requests/create-seller-product.dto";
import { CreateProductResponse } from "../responses/create-product.response";
import { UploadVideoDto } from "../../video/requests/upload-video.dto";
import { UploadImageDto } from "../../image/requests/upload-image.dto";
import { GetProductListQuery } from "../validation/get-product-list-query.schema";
import { ProductListResponse } from "../responses/product-list.response";
import { ProductResponse } from "../responses/product.response";
import { SellerProductRepository } from "../repositories/seller-product.repository";
import { ProductRepository } from "../../product/product.repository";
import { EventDispatcher } from "../events/event.dispatcher";

@Injectable()
export class SellerProductService
{
    public constructor(
        private readonly sellerProductRepository: SellerProductRepository,
        private readonly productRepository: ProductRepository,
        private readonly videoService: VideoService,
        private readonly sellerRepository: SellerRepository,
        private readonly imageService: ImageService,
        private readonly eventDispatcher: EventDispatcher,
    ) {}

    public async createProduct(
        dto: CreateSellerProductDto,
        video: Express.Multer.File,
        photos: Express.Multer.File[],
    ): Promise<CreateProductResponse>
    {
        if (!dto.sellerUserId)
        {
            throw new BadRequestException("Seller id was not found");
        }

        const seller = await this.sellerRepository.getSellerByUserId(dto.sellerUserId);

        if (!seller)
        {
            throw new ForbiddenException("Seller was not found");
        }

        const uploadVideoDto = new UploadVideoDto({ name: dto.name }, video);
        const uploadedVideo = await this.videoService.uploadVideo(uploadVideoDto);
        dto.setVideoEntity(uploadedVideo);

        const uploadImageDtos = photos.map((photo) => new UploadImageDto(photo));
        const uploadImages = await this.imageService.createImages(uploadImageDtos, seller.id);
        dto.setPhotos(uploadImages);

        const product = await this.sellerProductRepository.createSellerProduct(dto, seller.id);

        return new CreateProductResponse(product);
    }

    public async getProductList(query: GetProductListQuery): Promise<ProductListResponse>
    {
        const productEntities = await this.productRepository.getProducts(query);

        return new ProductListResponse(productEntities, productEntities[0]?.total || 0, query.limit, query.offset);
    }

    public async deleteProductById(productId: string): Promise<ProductResponse>
    {
        const deletedProduct = await this.productRepository.deleteProductById(productId);

        this.eventDispatcher.sendDeleteSellerProductEvent(deletedProduct);

        return new ProductResponse(deletedProduct);
    }
}
