export class CreateProductPhotoDto
{
    public photoId: string;
    public productId: string;

    public constructor(photoId: string, productId: string)
    {
        this.photoId = photoId;
        this.productId = productId;
    }
}
