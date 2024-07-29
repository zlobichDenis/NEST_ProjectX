import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { CreateSellerBody } from "../validation/create-seller.validation";

export class CreateSellerDto
{
    public id: string;
    public userId: string;

    @ApiProperty()
    public displayName: string;

    @ApiProperty()
    public fullName: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public contactPhoneNumber: string;

    @ApiProperty()
    public logo: Express.Multer.File;

    @ApiProperty()
    public country: string;

    @ApiProperty()
    public city: string;

    @ApiProperty()
    public postIndex: string;

    @ApiProperty()
    public street: string;

    @ApiProperty()
    public houseNumber: number;

    @ApiProperty()
    public contactEmail: string;

    @ApiPropertyOptional()
    public apartment?: number;

    public constructor({
        displayName,
        fullName,
        description,
        contactPhoneNumber,
        country,
        city,
        postIndex,
        apartment,
        street,
        houseNumber,
        contactEmail,
    }: CreateSellerBody)
    {
        this.id = uuidv4();
        this.displayName = displayName;
        this.fullName = fullName;
        this.description = description;
        this.contactPhoneNumber = contactPhoneNumber;
        this.street = street;
        this.country = country;
        this.city = city;
        this.postIndex = postIndex;
        this.apartment = apartment;
        this.houseNumber = houseNumber;
        this.contactEmail = contactEmail;
    }

    public setUserId(userId: string): CreateSellerDto
    {
        this.userId = userId;

        return this;
    }

    public setLogo(logo: Express.Multer.File): CreateSellerDto
    {
        this.logo = logo;

        return this;
    }
}
