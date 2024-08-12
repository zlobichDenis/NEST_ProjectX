export class CreateProductTagDto
{
    public productId: string;
    public tagId: string;

    public constructor(productId: string, tagId: string)
    {
        this.productId = productId;
        this.tagId = tagId;
    }
}
