import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SellerEntity } from "../entities/seller.entity";

export class CreateSellerResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public displayName: string;

    @ApiProperty()
    public fullName: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public contactPhoneNumber: string;

    @ApiProperty()
    public logo: string;

    @ApiPropertyOptional()
    public updatedAt?: Date;

    public constructor({
        id,
        displayName,
        fullName,
        createdAt,
        description,
        logo,
        contactPhoneNumber,
        userId,
        updatedAt,
    }: SellerEntity)
    {
        this.id = id;
        this.displayName = displayName;
        this.fullName = fullName;
        this.contactPhoneNumber = contactPhoneNumber;
        this.createdAt = createdAt;
        this.logo = logo;
        this.userId = userId;
        this.updatedAt = updatedAt;
        this.description = description;
    }
}
