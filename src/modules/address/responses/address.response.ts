import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AddressEntity } from "../entities/address.entity";

export class AddressResponse
{
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public contactPhoneNumber: string;

    @ApiProperty()
    public houseNumber: number;

    @ApiProperty()
    public country: string;

    @ApiProperty()
    public street: string;

    @ApiProperty()
    public city: string;

    @ApiPropertyOptional()
    public postIndex: string;

    @ApiPropertyOptional()
    public apartment: number;

    public constructor({
        id,
        createdAt,
        apartment,
        city,
        postIndex,
        country,
        houseNumber,
        street,
    }: AddressEntity)
    {
        this.id = id;
        this.country = country;
        this.street = street;
        this.postIndex = postIndex;
        this.houseNumber = houseNumber;
        this.city = city;
        this.createdAt = createdAt;
        this.apartment = apartment;
    }
}
