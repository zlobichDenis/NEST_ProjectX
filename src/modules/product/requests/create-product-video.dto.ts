export class CreateProductVideoDto
{
    public videoId: string;
    public productId: string;

    public constructor(videoId: string, productId: string)
    {
        this.videoId = videoId;
        this.productId = productId;
    }
}
